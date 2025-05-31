@echo off
echo =========================================
echo VERIFICACIÓN DEL PROYECTO FULL-STACK
echo Sistema de Gestión Académica - Sesión 2 Dokploy
echo =========================================
echo.

echo [1] Verificando estructura del proyecto...
if exist "backend\package.json" (
    echo ✓ Backend configurado
) else (
    echo ✗ Backend no encontrado
)

if exist "frontend\package.json" (
    echo ✓ Frontend configurado
) else (
    echo ✗ Frontend no encontrado
)

if exist "docker-compose.yml" (
    echo ✓ Docker Compose configurado
) else (
    echo ✗ Docker Compose no encontrado
)

if exist "database\init.sql" (
    echo ✓ Base de datos configurada
) else (
    echo ✗ Script de base de datos no encontrado
)

if exist "dokploy.json" (
    echo ✓ Configuración Dokploy lista
) else (
    echo ✗ Configuración Dokploy no encontrada
)

echo.
echo [2] Verificando archivos Docker...
if exist "backend\Dockerfile" (
    echo ✓ Dockerfile backend
) else (
    echo ✗ Dockerfile backend no encontrado
)

if exist "frontend\Dockerfile" (
    echo ✓ Dockerfile frontend
) else (
    echo ✗ Dockerfile frontend no encontrado
)

if exist "frontend\nginx.conf" (
    echo ✓ Configuración Nginx
) else (
    echo ✗ Configuración Nginx no encontrada
)

echo.
echo [3] Credenciales de acceso:
echo Email: admin@demo.com
echo Password: admin123
echo Base de datos: sistema_academico

echo.
echo [4] Para iniciar el proyecto:
echo docker-compose up --build

echo.
echo =========================================
echo PROYECTO LISTO PARA SESIÓN 2 DOKPLOY
echo =========================================
pause
