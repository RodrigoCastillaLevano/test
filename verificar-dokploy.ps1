# Verificación final del proyecto para Dokploy
Write-Host "🔍 VERIFICACIÓN FINAL DEL PROYECTO PARA DOKPLOY" -ForegroundColor Cyan
Write-Host "=============================================="

# Verificar estructura de archivos
Write-Host "📁 Verificando estructura de archivos..." -ForegroundColor Yellow

# Backend
if (Test-Path "backend/Dockerfile") {
    Write-Host "✅ backend/Dockerfile existe" -ForegroundColor Green
} else {
    Write-Host "❌ backend/Dockerfile NO encontrado" -ForegroundColor Red
}

if (Test-Path "backend/deploy.json") {
    Write-Host "✅ backend/deploy.json existe" -ForegroundColor Green
} else {
    Write-Host "❌ backend/deploy.json NO encontrado" -ForegroundColor Red
}

if (Test-Path "backend/DEPLOY-README.md") {
    Write-Host "✅ backend/DEPLOY-README.md existe" -ForegroundColor Green
} else {
    Write-Host "❌ backend/DEPLOY-README.md NO encontrado" -ForegroundColor Red
}

# Frontend
if (Test-Path "frontend/Dockerfile") {
    Write-Host "✅ frontend/Dockerfile existe" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/Dockerfile NO encontrado" -ForegroundColor Red
}

if (Test-Path "frontend/deploy.json") {
    Write-Host "✅ frontend/deploy.json existe" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/deploy.json NO encontrado" -ForegroundColor Red
}

if (Test-Path "frontend/DEPLOY-README.md") {
    Write-Host "✅ frontend/DEPLOY-README.md existe" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/DEPLOY-README.md NO encontrado" -ForegroundColor Red
}

if (Test-Path "frontend/nginx.conf") {
    Write-Host "✅ frontend/nginx.conf existe" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/nginx.conf NO encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 Verificando configuración de Git..." -ForegroundColor Yellow

# Verificar ramas remotas
Write-Host "📋 Ramas disponibles en GitHub:" -ForegroundColor Cyan
git branch -r

Write-Host ""
Write-Host "🔧 Variables de entorno necesarias:" -ForegroundColor Yellow
Write-Host ""
Write-Host "BACKEND:" -ForegroundColor Magenta
Write-Host "- NODE_ENV=production"
Write-Host "- PORT=3001"
Write-Host "- DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres"
Write-Host "- JWT_SECRET=mi_jwt_secret_super_seguro_2024"
Write-Host "- FRONTEND_URL=https://TU-DOMINIO-FRONTEND.com"
Write-Host ""
Write-Host "FRONTEND:" -ForegroundColor Magenta
Write-Host "- REACT_APP_API_URL=https://TU-DOMINIO-BACKEND.com/api"
Write-Host "- NODE_ENV=production"
Write-Host ""
Write-Host "BUILD ARGS FRONTEND:" -ForegroundColor Magenta
Write-Host "- REACT_APP_API_URL=https://TU-DOMINIO-BACKEND.com/api"

Write-Host ""
Write-Host "🎯 ORDEN DE DESPLIEGUE RECOMENDADO:" -ForegroundColor Yellow
Write-Host "1. Desplegar BACKEND primero (rama: backend-deploy)" -ForegroundColor White
Write-Host "2. Obtener dominio del backend desplegado" -ForegroundColor White
Write-Host "3. Desplegar FRONTEND con la URL del backend (rama: frontend-deploy)" -ForegroundColor White

Write-Host ""
Write-Host "🔗 URLs del repositorio:" -ForegroundColor Yellow
Write-Host "- Repositorio: https://github.com/RodrigoCastillaLevano/test.git" -ForegroundColor White
Write-Host "- Rama Backend: backend-deploy" -ForegroundColor White
Write-Host "- Rama Frontend: frontend-deploy" -ForegroundColor White
Write-Host "- Rama Completa: main (Docker Compose)" -ForegroundColor White

Write-Host ""
Write-Host "🔐 Credenciales de prueba:" -ForegroundColor Yellow
Write-Host "- Email: admin@demo.com" -ForegroundColor White
Write-Host "- Password: admin123" -ForegroundColor White

Write-Host ""
Write-Host "✨ ¡PROYECTO LISTO PARA DOKPLOY!" -ForegroundColor Green
Write-Host "Sigue la GUIA-PRUEBAS-DOKPLOY.md para los pasos detallados" -ForegroundColor Cyan
