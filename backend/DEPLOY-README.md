# Sistema Académico - Backend API

## 🚀 Despliegue en Dokploy - Solo Backend

Esta rama está optimizada para desplegar únicamente el backend del sistema académico.

### 📋 Configuración de Despliegue

**Tipo de Aplicación**: Docker Application
**Puerto**: 3001
**Health Check**: `/api/health`

### 🔧 Variables de Entorno Requeridas

```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres
JWT_SECRET=mi_jwt_secret_super_seguro_2024
FRONTEND_URL=https://tu-frontend-domain.com
```

### 🐳 Dockerfile

El backend utiliza un Dockerfile optimizado para producción:

- Base: Node.js 18 Alpine
- Puerto expuesto: 3001
- Instalación optimizada de dependencias
- Usuario no-root para seguridad

### 📡 Endpoints Disponibles

- `GET /api/health` - Health check
- `POST /api/auth/login` - Autenticación
- `GET /api/cursos` - Lista de cursos
- `POST /api/cursos` - Crear curso
- `PUT /api/cursos/:id` - Actualizar curso
- `DELETE /api/cursos/:id` - Eliminar curso

### 🔐 Credenciales de Prueba

- **Email**: admin@demo.com
- **Password**: admin123

### 📊 Base de Datos

- **Host**: 137.184.140.170:5432
- **Database**: postgres
- **Datos**: 10 cursos de ejemplo precargados

### 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm start

# Setup base de datos
node setup-db.js
```

### 🔍 Health Checks

El backend incluye varios endpoints de health check:

- `/api/health` - Estado general del servicio
- `/api/health/database` - Conexión a base de datos
- `/api/health/cursos-table` - Verificación de tabla cursos

### 🌐 CORS Configuration

El backend está configurado para aceptar requests desde:

- Frontend en desarrollo (localhost:3000)
- Frontend en producción (variable FRONTEND_URL)
- Cualquier dominio en desarrollo

## 🚀 Pasos para Desplegar en Dokploy

1. **Crear Nueva Aplicación**

   - Tipo: Docker Application
   - Nombre: `sistema-academico-backend`

2. **Configurar Repositorio**

   - URL: `https://github.com/RodrigoCastillaLevano/test.git`
   - Branch: `backend-deploy`
   - Build Context: `backend/`
   - Dockerfile: `Dockerfile`

3. **Variables de Entorno**

   - Copiar las variables listadas arriba
   - Ajustar FRONTEND_URL al dominio del frontend

4. **Dominio**

   - Configurar dominio personalizado
   - Ejemplo: `sistema-academico-api.tu-dominio.com`

5. **Deploy**
   - Hacer deploy y verificar logs
   - Probar endpoint: `/api/health`

---

**Nota**: Esta rama contiene solo el backend. Para el frontend, usar la rama `frontend-deploy`.
