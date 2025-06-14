# Sistema de Gestión Académica

Sistema Full-Stack para gestión de cursos académicos desarrollado con React, Express.js y PostgreSQL.

## 🚀 Tecnologías

- **Frontend**: React 18 + Context API
- **Backend**: Express.js + JWT Auth
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker + Docker Compose

## 📁 Estructura

```
.
├── frontend/           # Aplicación React
├── backend/            # API Express.js
├── database/           # Scripts SQL
└── docker-compose.yml  # Configuración de servicios
```

## 🔧 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/RodrigoCastillaLevano/test.git
cd test

# Ejecutar con Docker Compose
docker-compose up -d
```

## 🌐 Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Credenciales**: admin@demo.com / admin123

## 📊 Datos

El sistema incluye 10 cursos de Ingeniería de Sistemas con precios en soles peruanos.

## 🚀 Despliegue

### Frontend (Dokploy)
- **Build Type**: Dockerfile
- **Dockerfile Path**: `frontend/Dockerfile`
- **Docker Context**: `frontend`
- **Port**: 80

### Backend (Dokploy)
- **Build Type**: Dockerfile
- **Dockerfile Path**: `backend/Dockerfile`
- **Docker Context**: `backend`
- **Port**: 3001

### Variables de Entorno

**Frontend**:
```
REACT_APP_API_URL=https://tu-backend.com/api
```

**Backend**:
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=tu_secreto_jwt
```

## 📝 API Endpoints

- `POST /api/auth/login` - Autenticación
- `GET /api/cursos` - Lista de cursos
- `POST /api/cursos` - Crear curso
- `PUT /api/cursos/:id` - Actualizar curso
- `DELETE /api/cursos/:id` - Eliminar curso
- `GET /api/health` - Health check

- Frontend: http://localhost
- Backend API: http://localhost:3001

## Funcionalidades

- 📚 Gestión de cursos universitarios
- 👥 Información de docentes y modalidades
- 💰 Costos en soles peruanos (S/)
- 🎓 Créditos académicos y cupos disponibles
- 📊 Dashboard administrativo

## Tecnologías

- React 18 + React Router
- Express.js + PostgreSQL
- Docker + Docker Compose
- Traefik + Nginx
- Dokploy para CI/CD
#   t e s t 
 
 #   t e s t 
 
 #   t e s t 
 
 #   t e s t 
 
 #   t e s t 
 
 #   t e s t 
 
 