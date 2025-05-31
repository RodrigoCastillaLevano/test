console.log("Iniciando diagnóstico...");

const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres",
  ssl: false,
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Error de conexión:", err.message);
  } else {
    console.log("✅ Conexión exitosa:", result.rows[0]);

    // Verificar tablas
    pool.query(
      `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `,
      (err, result) => {
        if (err) {
          console.error("Error al obtener tablas:", err.message);
        } else {
          console.log("📋 Tablas encontradas:", result.rows.length);
          result.rows.forEach((row) => {
            console.log("  -", row.table_name);
          });
        }
        pool.end();
      }
    );
  }
});
