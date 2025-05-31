var express = require("express");
var router = express.Router();
const { Pool } = require("pg");

// Configuración de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Sistema Académico API" });
});

/* GET /api/health - Verificar estado de la aplicación y base de datos */
router.get("/health", async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    const client = await pool.connect();
    const result = await client.query(
      "SELECT NOW() as server_time, version() as postgres_version"
    );
    client.release();

    // Verificar si existe la tabla cursos
    const tableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'cursos'
    `);

    // Obtener todas las tablas para diagnóstico
    const allTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    let coursesCount = 0;
    if (tableCheck.rows.length > 0) {
      const countResult = await pool.query(
        "SELECT COUNT(*) as count FROM cursos"
      );
      coursesCount = parseInt(countResult.rows[0].count);
    }

    res.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        server_time: result.rows[0].server_time,
        postgres_version: result.rows[0].postgres_version,
        tables: {
          cursos_exists: tableCheck.rows.length > 0,
          cursos_count: coursesCount,
          all_tables: allTables.rows.map((row) => row.table_name),
        },
      },
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      success: false,
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: {
        connected: false,
        error: error.message,
      },
      environment: process.env.NODE_ENV || "development",
    });
  }
});

// Endpoint para verificar qué tablas existen
router.get("/tables", async (req, res) => {
  try {
    const tablesResult = await pool.query(`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    const cursosExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'cursos'
      )
    `);

    let cursosData = [];
    if (cursosExists.rows[0].exists) {
      const cursosResult = await pool.query(
        "SELECT codigo, nombre, costo FROM cursos LIMIT 5"
      );
      cursosData = cursosResult.rows;
    }

    res.json({
      success: true,
      tables: tablesResult.rows,
      cursos: {
        exists: cursosExists.rows[0].exists,
        sample_data: cursosData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
