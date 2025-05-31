const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// Credenciales hardcodeadas para la demo
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@demo.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

/**
 * POST /api/auth/login
 * Autenticación de administrador del sistema académico
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    // Verificar credenciales
    if (
      email !== ADMIN_CREDENTIALS.email ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        email: email,
        role: "admin",
        institution: "Sistema Académico",
      },
      process.env.JWT_SECRET || "jwt_secret_2024_sistema_academico",
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Autenticación exitosa",
      token,
      user: {
        email: email,
        role: "admin",
        institution: "Sistema de Gestión Académica",
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
});

/**
 * GET /api/auth/verify
 * Verificar token JWT válido
 */
router.get("/verify", (req, res) => {
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
      process.env.JWT_SECRET || "jwt_secret_2024_sistema_academico"
    );

    res.json({
      success: true,
      user: {
        email: decoded.email,
        role: decoded.role,
        institution: decoded.institution,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
});

module.exports = router;
