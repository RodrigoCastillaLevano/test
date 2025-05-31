const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function diagnosticarBaseDatos() {
  try {
    console.log("🔍 DIAGNÓSTICO DE BASE DE DATOS");
    console.log("================================");
    console.log(
      `📡 Conectando a: ${process.env.DATABASE_URL.replace(
        /\/\/.*@/,
        "//***:***@"
      )}`
    );

    // Verificar conexión
    const client = await pool.connect();
    console.log("✅ Conexión exitosa");

    // Obtener información básica
    const versionResult = await client.query("SELECT version()");
    console.log(`📊 PostgreSQL: ${versionResult.rows[0].version}`);

    // Listar todas las tablas
    const tablesResult = await client.query(`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log(`\n📋 Tablas encontradas (${tablesResult.rows.length}):`);
    if (tablesResult.rows.length === 0) {
      console.log('❌ No se encontraron tablas en el esquema "public"');
    } else {
      tablesResult.rows.forEach((row) => {
        console.log(`  - ${row.table_name} (${row.table_type})`);
      });
    }

    // Verificar específicamente la tabla cursos
    const cursosCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'cursos'
      )
    `);

    console.log(
      `\n🎯 Tabla "cursos" existe: ${
        cursosCheck.rows[0].exists ? "✅ SÍ" : "❌ NO"
      }`
    );

    if (cursosCheck.rows[0].exists) {
      const countResult = await client.query(
        "SELECT COUNT(*) as count FROM cursos"
      );
      console.log(`📊 Registros en "cursos": ${countResult.rows[0].count}`);

      if (parseInt(countResult.rows[0].count) > 0) {
        const sampleResult = await client.query(
          "SELECT codigo, nombre FROM cursos LIMIT 3"
        );
        console.log("📝 Ejemplos de cursos:");
        sampleResult.rows.forEach((row) => {
          console.log(`  - ${row.codigo}: ${row.nombre}`);
        });
      }
    }

    // Listar todos los esquemas disponibles
    const schemasResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `);

    console.log(`\n🗂️ Esquemas disponibles:`);
    schemasResult.rows.forEach((row) => {
      console.log(`  - ${row.schema_name}`);
    });

    client.release();
    console.log("\n✅ Diagnóstico completado");
  } catch (error) {
    console.error("❌ Error en diagnóstico:", error.message);
  } finally {
    await pool.end();
  }
}

diagnosticarBaseDatos();
