var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

var indexRouter = require("./routes/index");
var cursosRouter = require("./routes/cursos");
var authRouter = require("./routes/auth");

var app = express();

// Configuración CORS para desarrollo y producción
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:80",
  "https://frontend.r-c.lat",
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Health check general
app.get("/api/health", (req, res) => {
  const uptime = process.uptime();
  const uptimeString = `${Math.floor(uptime / 60)}m ${Math.floor(
    uptime % 60
  )}s`;

  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: uptimeString,
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// Endpoint para verificar conexión de base de datos
app.get("/api/health/database", async (req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const result = await pool.query(
      "SELECT NOW() as timestamp, version() as postgres_version"
    );
    await pool.end();

    res.json({
      success: true,
      message: "Conexión a base de datos exitosa",
      timestamp: result.rows[0].timestamp,
      postgres_version: result.rows[0].postgres_version,
      database_url: process.env.DATABASE_URL ? "Configurada" : "No configurada",
    });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    res.status(500).json({
      success: false,
      message: "Error conectando a la base de datos",
      error: error.message,
      database_url: process.env.DATABASE_URL ? "Configurada" : "No configurada",
    });
  }
});

// Endpoint para verificar si existe la tabla cursos
app.get("/api/health/cursos-table", async (req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'cursos'
      ) as table_exists
    `);

    let coursesCount = 0;
    if (tableCheck.rows[0].table_exists) {
      const countResult = await pool.query(
        "SELECT COUNT(*) as total FROM cursos"
      );
      coursesCount = parseInt(countResult.rows[0].total);
    }

    await pool.end();

    res.json({
      success: true,
      table_exists: tableCheck.rows[0].table_exists,
      courses_count: coursesCount,
      message: tableCheck.rows[0].table_exists
        ? `Tabla 'cursos' existe con ${coursesCount} registros`
        : "Tabla 'cursos' no existe. Ejecuta el script setup_dokploy_db.sql",
    });
  } catch (error) {
    console.error("Error verificando tabla cursos:", error);
    res.status(500).json({
      success: false,
      message: "Error verificando tabla cursos",
      error: error.message,
    });
  }
});

// Rutas API
app.use("/api/auth", authRouter);
app.use("/api/cursos", cursosRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.path.startsWith("/api/")) {
    // Para rutas API, devolver JSON
    res.json({ error: err.message, status: err.status || 500 });
  } else {
    // Para rutas web, renderizar página de error
    res.render("error");
  }
});

module.exports = app;
