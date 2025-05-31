o@echo off
echo ===============================================
echo VERIFICACION DE CONEXION A BASE DE DATOS
echo ===============================================
echo.

echo [INFO] Verificando conexion con la base de datos de Dokploy...
echo Base de datos: 137.184.140.170:5432
echo.

echo [1] Probando endpoint de salud del backend...
curl -s http://localhost:3001/health

echo.
echo.
echo [2] Probando endpoint de cursos...
curl -s http://localhost:3001/api/cursos

echo.
echo.
echo ===============================================
echo Si ves datos JSON arriba, la conexion funciona!
echo ===============================================
pause
