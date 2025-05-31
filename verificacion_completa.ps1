Write-Host "================================================" -ForegroundColor Cyan
Write-Host "    VERIFICACION COMPLETA DEL PROYECTO" -ForegroundColor Yellow
Write-Host "    Sistema de Gestion Academica - Sesion 2" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1] Verificando Backend API..." -ForegroundColor White
try {
    $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/cursos' -Method Get
    if($response.success) {
        Write-Host "✅ Backend funcionando - Cursos cargados: $($response.data.Count)" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en backend" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Backend no responde" -ForegroundColor Red
}

Write-Host ""
Write-Host "[2] Probando autenticacion..." -ForegroundColor White
try {
    $loginData = @{ email='admin@demo.com'; password='admin123' } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/login' -Method Post -Headers @{'Content-Type'='application/json'} -Body $loginData
    if($response.success) {
        Write-Host "✅ Login exitoso para: $($response.user.email)" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en login" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error de conexion en login" -ForegroundColor Red
}

Write-Host ""
Write-Host "[3] Verificando Frontend..." -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 5
    if($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend funcionando en puerto 3000" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend no responde correctamente" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Frontend no responde (puede estar iniciando...)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "                 CREDENCIALES" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Email:    admin@demo.com" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "                   ACCESO" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "API Docs: http://localhost:3001/api/cursos" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "            PROYECTO LISTO PARA SESION 2" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

Read-Host "Presiona Enter para continuar"
