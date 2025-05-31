# Script de verificación del proyecto Full-Stack para Sesión 2
Write-Host "=== Verificación del Proyecto Full-Stack ===" -ForegroundColor Cyan
Write-Host ""

# Verificar estructura de archivos
Write-Host "1. Verificando estructura de archivos..." -ForegroundColor Yellow
if (Test-Path "docker-compose.yml") {
    Write-Host "   ✓ docker-compose.yml presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ docker-compose.yml faltante" -ForegroundColor Red
}

if (Test-Path "backend/Dockerfile") {
    Write-Host "   ✓ backend/Dockerfile presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ backend/Dockerfile faltante" -ForegroundColor Red
}

if (Test-Path "frontend/Dockerfile") {
    Write-Host "   ✓ frontend/Dockerfile presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ frontend/Dockerfile faltante" -ForegroundColor Red
}

if (Test-Path "database/init.sql") {
    Write-Host "   ✓ database/init.sql presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ database/init.sql faltante" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Verificando archivos de configuración..." -ForegroundColor Yellow
if (Test-Path "backend/.env") {
    Write-Host "   ✓ backend/.env presente" -ForegroundColor Green
} else {
    Write-Host "   ⚠ backend/.env faltante (copiar desde .env.sample)" -ForegroundColor Yellow
}

if (Test-Path "frontend/.env") {
    Write-Host "   ✓ frontend/.env presente" -ForegroundColor Green
} else {
    Write-Host "   ⚠ frontend/.env faltante (copiar desde .env.sample)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3. Verificando componentes React..." -ForegroundColor Yellow
if (Test-Path "frontend/src/components/Login.js") {
    Write-Host "   ✓ Componente Login presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ Componente Login faltante" -ForegroundColor Red
}

if (Test-Path "frontend/src/components/Dashboard.js") {
    Write-Host "   ✓ Componente Dashboard presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ Componente Dashboard faltante" -ForegroundColor Red
}

if (Test-Path "frontend/src/context/AuthContext.js") {
    Write-Host "   ✓ AuthContext presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ AuthContext faltante" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Verificando rutas del backend..." -ForegroundColor Yellow
if (Test-Path "backend/routes/auth.js") {
    Write-Host "   ✓ Ruta de autenticación presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ Ruta de autenticación faltante" -ForegroundColor Red
}

if (Test-Path "backend/routes/cursos.js") {
    Write-Host "   ✓ Ruta de cursos presente" -ForegroundColor Green
} else {
    Write-Host "   ✗ Ruta de cursos faltante" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Comandos para ejecutar el proyecto ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para desarrollo local:" -ForegroundColor White
Write-Host "  docker-compose up --build" -ForegroundColor Gray
Write-Host ""
Write-Host "Para ver logs:" -ForegroundColor White
Write-Host "  docker-compose logs -f" -ForegroundColor Gray
Write-Host ""
Write-Host "Para detener:" -ForegroundColor White
Write-Host "  docker-compose down" -ForegroundColor Gray
Write-Host ""
Write-Host "URLs de acceso (una vez ejecutado):" -ForegroundColor White
Write-Host "  Frontend: http://localhost" -ForegroundColor Gray
Write-Host "  Backend API: http://localhost:3001" -ForegroundColor Gray
Write-Host "  Base de datos: localhost:5432" -ForegroundColor Gray
Write-Host ""
Write-Host "Credenciales de prueba:" -ForegroundColor White
Write-Host "  Email: admin@undc.edu.pe" -ForegroundColor Gray
Write-Host "  Password: admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "Proyecto listo para la Sesión 2 - Despliegue con Dokploy!" -ForegroundColor Green
