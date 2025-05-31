# 🚀 Backend API - Sistema de Gestión Académica

API REST desarrollada con Express.js para gestión de cursos académicos.

## 📋 Características

- ✅ **Autenticación JWT** - Login/logout seguro
- ✅ **CRUD Completo** - Gestión de cursos
- ✅ **Base de Datos** - PostgreSQL con conexión externa
- ✅ **Health Checks** - Monitoreo de estado
- ✅ **CORS Configurado** - Conexión con frontend
- ✅ **Docker Ready** - Containerización incluida

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_super_secure_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🚀 Ejecución Local

```bash
# Instalar dependencias
npm install

# Configurar base de datos (solo primera vez)
node setup-db.js

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 🐳 Docker

```bash
# Build de la imagen
docker build -t backend-gestion .

# Ejecutar contenedor
docker run -p 3001:3001 --env-file .env backend-gestion
```

## 📚 API Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Cursos

- `GET /api/cursos` - Listar todos los cursos
- `GET /api/cursos/:id` - Obtener curso por ID
- `POST /api/cursos` - Crear nuevo curso
- `PUT /api/cursos/:id` - Actualizar curso
- `DELETE /api/cursos/:id` - Eliminar curso

### Health Checks

- `GET /api/health` - Estado general del servicio
- `GET /api/health/database` - Estado de conexión a BD

## 🔐 Credenciales de Prueba

```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

## 📊 Datos de Ejemplo

El sistema incluye 10 cursos de Ingeniería de Sistemas:

- Fundamentos de Programación (S/ 850.00)
- Estructura de Datos (S/ 920.00)
- Base de Datos I (S/ 870.00)
- Y más...

## 🔧 Desarrollo

### Scripts disponibles:

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar con nodemon
- `npm test` - Ejecutar tests (pendiente)

### Estructura del proyecto:

```
backend/
├── routes/          # Endpoints de la API
├── bin/             # Scripts de inicio
├── public/          # Archivos estáticos
├── views/           # Templates EJS
├── Dockerfile       # Configuración Docker
├── setup-db.js      # Script de BD
└── app.js          # Aplicación principal
```
