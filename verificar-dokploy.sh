#!/bin/bash

echo "🔍 VERIFICACIÓN FINAL DEL PROYECTO PARA DOKPLOY"
echo "=============================================="

# Verificar estructura de archivos
echo "📁 Verificando estructura de archivos..."

# Backend
if [ -f "backend/Dockerfile" ]; then
    echo "✅ backend/Dockerfile existe"
else
    echo "❌ backend/Dockerfile NO encontrado"
fi

if [ -f "backend/deploy.json" ]; then
    echo "✅ backend/deploy.json existe"
else
    echo "❌ backend/deploy.json NO encontrado"
fi

if [ -f "backend/DEPLOY-README.md" ]; then
    echo "✅ backend/DEPLOY-README.md existe"
else
    echo "❌ backend/DEPLOY-README.md NO encontrado"
fi

# Frontend
if [ -f "frontend/Dockerfile" ]; then
    echo "✅ frontend/Dockerfile existe"
else
    echo "❌ frontend/Dockerfile NO encontrado"
fi

if [ -f "frontend/deploy.json" ]; then
    echo "✅ frontend/deploy.json existe"
else
    echo "❌ frontend/deploy.json NO encontrado"
fi

if [ -f "frontend/DEPLOY-README.md" ]; then
    echo "✅ frontend/DEPLOY-README.md existe"
else
    echo "❌ frontend/DEPLOY-README.md NO encontrado"
fi

if [ -f "frontend/nginx.conf" ]; then
    echo "✅ frontend/nginx.conf existe"
else
    echo "❌ frontend/nginx.conf NO encontrado"
fi

echo ""
echo "🌐 Verificando configuración de Git..."

# Verificar ramas remotas
echo "📋 Ramas disponibles en GitHub:"
git branch -r

echo ""
echo "🔧 Variables de entorno necesarias:"
echo ""
echo "BACKEND:"
echo "- NODE_ENV=production"
echo "- PORT=3001"
echo "- DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres"
echo "- JWT_SECRET=mi_jwt_secret_super_seguro_2024"
echo "- FRONTEND_URL=https://TU-DOMINIO-FRONTEND.com"
echo ""
echo "FRONTEND:"
echo "- REACT_APP_API_URL=https://TU-DOMINIO-BACKEND.com/api"
echo "- NODE_ENV=production"
echo ""
echo "BUILD ARGS FRONTEND:"
echo "- REACT_APP_API_URL=https://TU-DOMINIO-BACKEND.com/api"

echo ""
echo "🎯 ORDEN DE DESPLIEGUE RECOMENDADO:"
echo "1. Desplegar BACKEND primero (rama: backend-deploy)"
echo "2. Obtener dominio del backend desplegado"
echo "3. Desplegar FRONTEND con la URL del backend (rama: frontend-deploy)"

echo ""
echo "🔗 URLs del repositorio:"
echo "- Repositorio: https://github.com/RodrigoCastillaLevano/test.git"
echo "- Rama Backend: backend-deploy"
echo "- Rama Frontend: frontend-deploy"
echo "- Rama Completa: main (Docker Compose)"

echo ""
echo "🔐 Credenciales de prueba:"
echo "- Email: admin@demo.com"
echo "- Password: admin123"

echo ""
echo "✨ ¡PROYECTO LISTO PARA DOKPLOY!"
echo "Sigue la GUIA-PRUEBAS-DOKPLOY.md para los pasos detallados"
