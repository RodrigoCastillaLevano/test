# Backend - API Express.js

API REST para el sistema de gestión académica.

## 🚀 Tecnologías

- Node.js 18
- Express.js
- PostgreSQL
- JWT Authentication
- Docker

## 🔧 Desarrollo

```bash
npm install
npm run dev
```

## 📡 Endpoints

- `POST /api/auth/login` - Login
- `GET /api/cursos` - Lista cursos
- `POST /api/cursos` - Crear curso
- `PUT /api/cursos/:id` - Actualizar curso
- `DELETE /api/cursos/:id` - Eliminar curso
- `GET /api/health` - Health check

## 🌐 Variables de Entorno

```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=secreto_jwt
FRONTEND_URL=https://frontend.com
```
