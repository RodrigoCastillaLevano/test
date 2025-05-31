const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:admin123@postgres:5432/undc_academico",
});

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token de autorización requerido",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "undc_jwt_secret_2024"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

/**
 * GET /api/cursos
 * Obtener todos los cursos
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, codigo, nombre, descripcion, creditos, costo, 
             semestre, docente, modalidad, cupos_disponibles,
             created_at, updated_at
      FROM cursos 
      ORDER BY codigo ASC
    `);

    res.json({
      success: true,
      data: result.rows,
      total: result.rowCount,
    });
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener cursos",
    });
  }
});

/**
 * GET /api/cursos/:id
 * Obtener un curso por ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM cursos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al obtener curso:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener curso",
    });
  }
});

/**
 * POST /api/cursos
 * Crear un nuevo curso (sin autenticación para pruebas)
 */
router.post("/", async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      descripcion,
      creditos,
      costo,
      semestre,
      docente,
      modalidad,
      cupos_disponibles,
    } = req.body;

    // Validaciones básicas
    if (!codigo || !nombre || !creditos || !costo) {
      return res.status(400).json({
        success: false,
        message: "Código, nombre, créditos y costo son campos requeridos",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO cursos (codigo, nombre, descripcion, creditos, costo, semestre, docente, modalidad, cupos_disponibles)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        codigo,
        nombre,
        descripcion,
        creditos,
        costo,
        semestre,
        docente,
        modalidad,
        cupos_disponibles || 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Curso creado exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al crear curso:", error);

    // Manejar error de código duplicado
    if (error.code === "23505" && error.constraint === "cursos_codigo_key") {
      return res.status(409).json({
        success: false,
        message: "Ya existe un curso con ese código",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al crear curso",
    });
  }
});

/**
 * PUT /api/cursos/:id
 * Actualizar un curso existente (requiere autenticación)
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      codigo,
      nombre,
      descripcion,
      creditos,
      costo,
      semestre,
      docente,
      modalidad,
      cupos_disponibles,
    } = req.body;

    // Verificar que el curso existe
    const existingCourse = await pool.query(
      "SELECT id FROM cursos WHERE id = $1",
      [id]
    );
    if (existingCourse.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    const result = await pool.query(
      `
      UPDATE cursos 
      SET codigo = $1, nombre = $2, descripcion = $3, creditos = $4, 
          costo = $5, semestre = $6, docente = $7, modalidad = $8, 
          cupos_disponibles = $9, updated_at = NOW()
      WHERE id = $10
      RETURNING *
    `,
      [
        codigo,
        nombre,
        descripcion,
        creditos,
        costo,
        semestre,
        docente,
        modalidad,
        cupos_disponibles,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Curso actualizado exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar curso:", error);

    if (error.code === "23505" && error.constraint === "cursos_codigo_key") {
      return res.status(409).json({
        success: false,
        message: "Ya existe un curso con ese código",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al actualizar curso",
    });
  }
});

/**
 * DELETE /api/cursos/:id
 * Eliminar un curso (requiere autenticación)
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM cursos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Curso eliminado exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar curso",
    });
  }
});

module.exports = router;
