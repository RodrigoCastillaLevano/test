#!/bin/bash

echo "=== Verificación del Proyecto Full-Stack ==="
echo ""

# Verificar estructura de archivos
echo "1. Verificando estructura de archivos..."
if [ -f "docker-compose.yml" ]; then
    echo "   ✓ docker-compose.yml presente"
else
    echo "   ✗ docker-compose.yml faltante"
fi

if [ -f "backend/Dockerfile" ]; then
    echo "   ✓ backend/Dockerfile presente"
else
    echo "   ✗ backend/Dockerfile faltante"
fi

if [ -f "frontend/Dockerfile" ]; then
    echo "   ✓ frontend/Dockerfile presente"
else
    echo "   ✗ frontend/Dockerfile faltante"
fi

if [ -f "database/init.sql" ]; then
    echo "   ✓ database/init.sql presente"
else
    echo "   ✗ database/init.sql faltante"
fi

echo ""
echo "2. Verificando dependencias del backend..."
cd backend
if [ -f "package.json" ]; then
    echo "   ✓ package.json presente"
    npm list --depth=0 2>/dev/null | grep -E "(express|pg|jsonwebtoken|cors|bcrypt|dotenv)" || echo "   - Algunas dependencias pueden faltar"
else
    echo "   ✗ package.json faltante"
fi
cd ..

echo ""
echo "3. Verificando dependencias del frontend..."
cd frontend
if [ -f "package.json" ]; then
    echo "   ✓ package.json presente"
    npm list --depth=0 2>/dev/null | grep -E "(react|axios|react-router-dom)" || echo "   - Algunas dependencias pueden faltar"
else
    echo "   ✗ package.json faltante"
fi
cd ..

echo ""
echo "4. Verificando archivos de configuración..."
if [ -f "backend/.env" ]; then
    echo "   ✓ backend/.env presente"
else
    echo "   ⚠ backend/.env faltante (copiar desde .env.sample)"
fi

if [ -f "frontend/.env" ]; then
    echo "   ✓ frontend/.env presente"
else
    echo "   ⚠ frontend/.env faltante (copiar desde .env.sample)"
fi

echo ""
echo "=== Comandos para ejecutar el proyecto ==="
echo ""
echo "Para desarrollo local:"
echo "  docker-compose up --build"
echo ""
echo "Para ver logs:"
echo "  docker-compose logs -f"
echo ""
echo "Para detener:"
echo "  docker-compose down"
echo ""
echo "URLs de acceso (una vez ejecutado):"
echo "  Frontend: http://localhost"
echo "  Backend API: http://localhost:3001"
echo "  Base de datos: localhost:5432"
echo ""
echo "Credenciales de prueba:"
echo "  Email: admin@undc.edu.pe"
echo "  Password: admin123"
