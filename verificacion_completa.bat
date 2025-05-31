@echo off
echo ================================================
echo    VERIFICACION COMPLETA DEL PROYECTO
echo    Sistema de Gestion Academica - Sesion 2
echo ================================================
echo.

echo [1] Verificando Backend API...
echo.
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/cursos' -Method Get; if($response.success) { Write-Host '✅ Backend funcionando - Cursos cargados:' $response.data.Count } else { Write-Host '❌ Error en backend' } } catch { Write-Host '❌ Backend no responde' }"

echo.
echo [2] Probando autenticacion...
echo.
powershell -Command "try { $loginData = @{ email='admin@demo.com'; password='admin123' } | ConvertTo-Json; $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/login' -Method Post -Headers @{'Content-Type'='application/json'} -Body $loginData; if($response.success) { Write-Host '✅ Login exitoso para:' $response.user.email } else { Write-Host '❌ Error en login' } } catch { Write-Host '❌ Error de conexion en login' }"

echo.
echo [3] Verificando Frontend...
echo.
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing; if($response.StatusCode -eq 200) { Write-Host '✅ Frontend funcionando en puerto 3000' } else { Write-Host '❌ Frontend no responde correctamente' } } catch { Write-Host '❌ Frontend no responde' }"

echo.
echo ================================================
echo                 CREDENCIALES
echo ================================================
echo Email:    admin@demo.com
echo Password: admin123
echo.
echo ================================================
echo                   ACCESO
echo ================================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo API Docs: http://localhost:3001/api/cursos
echo.
echo ================================================
echo            PROYECTO LISTO PARA SESION 2
echo ================================================
pause
