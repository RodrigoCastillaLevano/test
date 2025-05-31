# Despliegue en Dokploy - Guía Paso a Paso

## 📋 Resumen del Proyecto

- **Repositorio**: https://github.com/RodrigoCastillaLevano/test.git
- **Stack**: React + Express + PostgreSQL
- **Puerto Frontend**: 80 (Nginx)
- **Puerto Backend**: 3001
- **Base de Datos**: PostgreSQL externa (ya configurada)

## 🚀 Pasos para Desplegar en Dokploy

### 1. Crear Nueva Aplicación

1. Acceder a tu panel de Dokploy
2. Clic en "Create Application"
3. Seleccionar "Docker Compose"
4. Nombre: `sistema-gestion-academica`

### 2. Configurar Repositorio

- **Repository URL**: `https://github.com/RodrigoCastillaLevano/test.git`
- **Branch**: `main`
- **Build Path**: `/` (raíz del proyecto)
- **Docker Compose File**: `docker-compose.yml`

### 3. Variables de Entorno Requeridas

Configurar las siguientes variables en Dokploy:

#### Backend Variables:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres
JWT_SECRET=mi_jwt_secret_super_seguro_2024
```

#### Frontend Variables:

```
REACT_APP_API_URL=https://tu-dominio.com/api
```

### 4. Configuración de Dominios

#### Dominio Principal (Frontend):

- **Service**: `frontend`
- **Port**: `80`
- **Domain**: `tu-dominio.com`

#### Subdominio API (Backend):

- **Service**: `backend`
- **Port**: `3001`
- **Domain**: `api.tu-dominio.com` o usar path `/api`

### 5. Deploy

1. Clic en "Deploy"
2. Monitorear logs durante el build
3. Verificar que los 3 servicios estén ejecutándose

## 🔧 Configuración Post-Despliegue

### Verificar Servicios

1. **Frontend**: Acceder a tu dominio principal
2. **Backend API**: Probar endpoints:
   - `GET /api/health` - Health check
   - `POST /api/auth/login` - Login
   - `GET /api/cursos` - Lista de cursos

### Credenciales de Prueba

- **Email**: `admin@demo.com`
- **Password**: `admin123`

## 📊 Datos de Ejemplo

El sistema incluye 10 cursos de Ingeniería de Sistemas con precios en soles:

1. **Fundamentos de Programación** - S/ 850.00
2. **Estructura de Datos** - S/ 920.00
3. **Base de Datos I** - S/ 870.00
4. **Desarrollo Web** - S/ 950.00
5. **Programación Orientada a Objetos** - S/ 880.00
6. **Redes de Computadoras** - S/ 790.00
7. **Ingeniería de Software** - S/ 980.00
8. **Sistemas Operativos** - S/ 860.00
9. **Arquitectura de Computadoras** - S/ 820.00
10. **Proyecto de Tesis** - S/ 1200.00

## 🐛 Troubleshooting

### Problemas Comunes:

1. **Error de conexión a BD**:

   - Verificar DATABASE_URL
   - Confirmar que la BD externa esté accesible

2. **CORS Error**:

   - Verificar REACT_APP_API_URL en frontend
   - Confirmar configuración CORS en backend

3. **Build Failure**:
   - Revisar logs de Docker
   - Verificar dependencias en package.json

### Comandos de Diagnóstico:

```bash
# Ver logs del contenedor
docker logs [container_id]

# Acceder al contenedor
docker exec -it [container_id] /bin/bash

# Verificar conexión a BD
curl -X GET http://backend:3001/api/health
```

## 📝 Notas para la Sesión

- Base de datos ya configurada externamente
- Datos de ejemplo precargados
- Autenticación JWT implementada
- API REST completa con operaciones CRUD
- Frontend responsivo con Context API
- Docker Compose listo para producción

## 🔗 Enlaces Útiles

- **Repositorio**: https://github.com/RodrigoCastillaLevano/test.git
- **Documentación Dokploy**: [enlace a docs]
- **Docker Compose Docs**: https://docs.docker.com/compose/
