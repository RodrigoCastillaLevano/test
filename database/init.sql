-- Crear base de datos para el Sistema de Gestión Académica
CREATE DATABASE sistema_academico;

\c sistema_academico;

-- Tabla de cursos del sistema académico
CREATE TABLE cursos (
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
);

-- Insertar cursos de ejemplo de Ingeniería de Sistemas
INSERT INTO cursos (codigo, nombre, descripcion, creditos, costo, semestre, docente, modalidad, cupos_disponibles) VALUES
('IS101', 'Fundamentos de Programación', 'Introducción a la programación con Python y algoritmos básicos', 4, 450.00, '2024-I', 'Dr. Carlos Mendoza', 'Presencial', 35),
('IS102', 'Matemática Discreta', 'Lógica matemática, teoría de conjuntos y grafos aplicados a sistemas', 3, 380.00, '2024-I', 'Mg. Ana Quispe', 'Presencial', 40),
('IS201', 'Programación Orientada a Objetos', 'Paradigmas de POO con Java y C++', 4, 480.00, '2024-I', 'Ing. Luis Vargas', 'Híbrida', 30),
('IS202', 'Base de Datos I', 'Diseño e implementación de bases de datos relacionales', 4, 520.00, '2024-I', 'Mg. Patricia Silva', 'Presencial', 25),
('IS301', 'Desarrollo Web', 'Tecnologías frontend y backend para aplicaciones web modernas', 5, 650.00, '2024-II', 'Ing. Roberto Flores', 'Híbrida', 28),
('IS302', 'Redes de Computadoras', 'Arquitectura y protocolos de redes, configuración de equipos', 4, 580.00, '2024-II', 'Ing. María Santos', 'Presencial', 22),
('IS401', 'Ingeniería de Software', 'Metodologías ágiles, análisis y diseño de sistemas', 5, 720.00, '2024-II', 'Dr. Fernando León', 'Presencial', 20),
('IS402', 'Inteligencia Artificial', 'Machine Learning y algoritmos de IA aplicados', 4, 780.00, '2024-II', 'PhD. Elena Morales', 'Híbrida', 18),
('IS501', 'Seguridad Informática', 'Ciberseguridad, ethical hacking y protección de sistemas', 4, 850.00, '2024-III', 'Mg. Diego Ramírez', 'Presencial', 15),
('IS502', 'Proyecto de Tesis', 'Desarrollo del proyecto final de carrera', 6, 950.00, '2024-III', 'Comité de Tesis', 'Presencial', 12);

-- Índices para optimizar consultas
CREATE INDEX idx_cursos_codigo ON cursos(codigo);
CREATE INDEX idx_cursos_nombre ON cursos(nombre);
CREATE INDEX idx_cursos_semestre ON cursos(semestre);
CREATE INDEX idx_cursos_created_at ON cursos(created_at);

-- Verificar datos insertados
SELECT COUNT(*) as total_cursos FROM cursos;
SELECT codigo, nombre, costo, semestre FROM cursos ORDER BY codigo;
