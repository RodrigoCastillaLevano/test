const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres",
  ssl: false,
});

async function setupDatabase() {
  console.log("🚀 Configurando base de datos...");

  try {
    // 1. Crear tabla cursos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cursos (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(10) NOT NULL UNIQUE,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        creditos INTEGER NOT NULL,
        costo DECIMAL(10, 2) NOT NULL,
        semestre VARCHAR(20),
        docente VARCHAR(255),
        modalidad VARCHAR(50),
        cupos_disponibles INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Tabla cursos creada");

    // 2. Insertar datos de ejemplo
    await pool.query(`
      INSERT INTO cursos (codigo, nombre, descripcion, creditos, costo, semestre, docente, modalidad, cupos_disponibles) 
      VALUES 
      ('IS101', 'Fundamentos de Programación', 'Introducción a la programación con Python y algoritmos básicos', 4, 450.00, '2024-I', 'Dr. Carlos Mendoza', 'Presencial', 35),
      ('IS102', 'Matemática Discreta', 'Lógica matemática, teoría de conjuntos y grafos aplicados a sistemas', 3, 380.00, '2024-I', 'Mg. Ana Quispe', 'Presencial', 40),
      ('IS201', 'Programación Orientada a Objetos', 'Paradigmas de POO con Java y C++', 4, 480.00, '2024-I', 'Ing. Luis Vargas', 'Híbrida', 30),
      ('IS202', 'Base de Datos I', 'Diseño e implementación de bases de datos relacionales', 4, 520.00, '2024-I', 'Mg. Patricia Silva', 'Presencial', 25),
      ('IS301', 'Desarrollo Web', 'Tecnologías frontend y backend para aplicaciones web modernas', 5, 650.00, '2024-II', 'Ing. Roberto Flores', 'Híbrida', 28),
      ('IS302', 'Redes de Computadoras', 'Arquitectura y protocolos de redes, configuración de equipos', 4, 580.00, '2024-II', 'Ing. María Santos', 'Presencial', 22),
      ('IS401', 'Ingeniería de Software', 'Metodologías ágiles, análisis y diseño de sistemas', 5, 720.00, '2024-II', 'Dr. Fernando León', 'Presencial', 20),
      ('IS402', 'Inteligencia Artificial', 'Machine Learning y algoritmos de IA aplicados', 4, 780.00, '2024-II', 'PhD. Elena Morales', 'Híbrida', 18),
      ('IS501', 'Seguridad Informática', 'Ciberseguridad, ethical hacking y protección de sistemas', 4, 850.00, '2024-III', 'Mg. Diego Ramírez', 'Presencial', 15),
      ('IS502', 'Proyecto de Tesis', 'Desarrollo del proyecto final de carrera', 6, 950.00, '2024-III', 'Comité de Tesis', 'Presencial', 12)
      ON CONFLICT (codigo) DO NOTHING
    `);
    console.log("✅ Datos insertados");

    // 3. Crear índices
    await pool.query(
      "CREATE INDEX IF NOT EXISTS idx_cursos_codigo ON cursos(codigo)"
    );
    await pool.query(
      "CREATE INDEX IF NOT EXISTS idx_cursos_nombre ON cursos(nombre)"
    );
    console.log("✅ Índices creados");

    // 4. Verificar datos
    const result = await pool.query("SELECT COUNT(*) as count FROM cursos");
    console.log(`✅ Total de cursos: ${result.rows[0].count}`);

    console.log("🎉 ¡Base de datos configurada correctamente!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
