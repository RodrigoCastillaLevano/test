# 🚀 Despliegue Separado en Dokploy - Frontend y Backend

## 📋 Resumen de la Estrategia

Desplegar **Frontend** y **Backend** como aplicaciones separadas en Dokploy para mayor flexibilidad y escalabilidad.

### 🎯 Ventajas del Despliegue Separado:

- ✅ Escalado independiente de cada servicio
- ✅ Despliegues independientes (CI/CD)
- ✅ Mejor gestión de dominios y SSL
- ✅ Monitoreo granular por servicio
- ✅ Rollbacks independientes

## 🔧 Configuración del Proyecto

### Repositorio GitHub:

**URL**: `https://github.com/RodrigoCastillaLevano/test.git`

### Estructura de Despliegue:

```
📁 Backend App  → /backend/  (Puerto 3001)
📁 Frontend App → /frontend/ (Puerto 80)
🗄️ Database     → Externa (ya configurada)
```

---

## 🛠️ PASO 1: Desplegar Backend

### 1.1 Crear Aplicación Backend en Dokploy

1. **Acceder a Dokploy** → "Create Application"
2. **Tipo**: `Application`
3. **Build Type**: `Dockerfile`
4. **Configuración**:
   - **Name**: `sistema-gestion-backend`
   - **Repository**: `https://github.com/RodrigoCastillaLevano/test.git`
   - **Branch**: `main`
   - **Build Path**: `/backend`
   - **Dockerfile Path**: `./Dockerfile`

### 1.2 Variables de Entorno del Backend

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres
JWT_SECRET=mi_jwt_secret_super_seguro_2024
FRONTEND_URL=https://TU-FRONTEND-DOMAIN.com
CORS_ORIGIN=https://TU-FRONTEND-DOMAIN.com
```

### 1.3 Configurar Dominio Backend

- **Domain**: `api.tu-dominio.com` o `backend.tu-dominio.com`
- **Port**: `3001`
- **SSL**: ✅ Habilitado (Let's Encrypt automático)

### 1.4 Health Check Backend

- **Path**: `/api/health`
- **Port**: `3001`
- **Initial Delay**: `30s`
- **Period**: `10s`

---

## 🎨 PASO 2: Desplegar Frontend

### 2.1 Crear Aplicación Frontend en Dokploy

1. **Crear nueva aplicación** → `Application`
2. **Build Type**: `Dockerfile`
3. **Configuración**:
   - **Name**: `sistema-gestion-frontend`
   - **Repository**: `https://github.com/RodrigoCastillaLevano/test.git`
   - **Branch**: `main`
   - **Build Path**: `/frontend`
   - **Dockerfile Path**: `./Dockerfile`

### 2.2 Variables de Entorno del Frontend

```env
NODE_ENV=production
REACT_APP_API_URL=https://api.tu-dominio.com/api
REACT_APP_ENV=production
REACT_APP_TITLE=Sistema de Gestión Académica
```

### 2.3 Configurar Dominio Frontend

- **Domain**: `app.tu-dominio.com` o `tu-dominio.com`
- **Port**: `80`
- **SSL**: ✅ Habilitado (Let's Encrypt automático)

### 2.4 Health Check Frontend

- **Path**: `/`
- **Port**: `80`
- **Initial Delay**: `20s`
- **Period**: `30s`

---

## 🔗 PASO 3: Configuración de Conectividad

### 3.1 CORS Configuration

El backend ya está configurado para múltiples orígenes. Asegúrate de que `FRONTEND_URL` y `CORS_ORIGIN` apunten al dominio correcto del frontend.

### 3.2 API URL Configuration

El frontend debe apuntar al dominio del backend através de `REACT_APP_API_URL`.

### 3.3 Ejemplo de Dominios:

```
Frontend: https://gestion-academica.tu-dominio.com
Backend:  https://api-gestion.tu-dominio.com/api
```

---

## ✅ PASO 4: Verificación y Testing

### 4.1 Backend Health Checks

```bash
# Health general
curl https://api.tu-dominio.com/api/health

# Health de base de datos
curl https://api.tu-dominio.com/api/health/database

# Login test
curl -X POST https://api.tu-dominio.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'

# Cursos
curl https://api.tu-dominio.com/api/cursos
```

### 4.2 Frontend Tests

1. **Acceder**: `https://tu-frontend-domain.com`
2. **Login**: admin@demo.com / admin123
3. **Verificar**: Lista de cursos carga correctamente
4. **CRUD**: Crear/editar/eliminar curso

### 4.3 Integration Tests

- ✅ Login desde frontend conecta con backend
- ✅ CRUD operations funcionan end-to-end
- ✅ CORS permite requests del frontend al backend
- ✅ Autenticación JWT persiste entre requests

---

## 🔧 PASO 5: Monitoreo y Logs

### 5.1 Backend Monitoring

```bash
# Ver logs en tiempo real
dokploy logs sistema-gestion-backend --follow

# Metrics de performance
dokploy metrics sistema-gestion-backend
```

### 5.2 Frontend Monitoring

```bash
# Ver logs del nginx
dokploy logs sistema-gestion-frontend --follow

# Status de la aplicación
dokploy status sistema-gestion-frontend
```

---

## 🚨 Troubleshooting Común

### CORS Errors:

1. Verificar `FRONTEND_URL` en backend
2. Confirmar `REACT_APP_API_URL` en frontend
3. Revisar configuración CORS en `app.js`

### Database Connection:

1. Verificar `DATABASE_URL` en backend
2. Test de conectividad: `/api/health/database`
3. Confirmar firewall y acceso de red

### Build Failures:

```bash
# Frontend build issues
npm run build --verbose

# Backend dependency issues
npm ci --only=production
```

---

## 📊 Configuración Final

### Credenciales de Prueba:

- **Usuario**: admin@demo.com
- **Password**: admin123

### Base de Datos:

- **Host**: 137.184.140.170:5432
- **Database**: postgres
- **10 cursos** precargados

### Repositorio:

- **GitHub**: https://github.com/RodrigoCastillaLevano/test.git
- **Branch**: main

---

## 🎉 ¡Despliegue Completado!

Cuando ambas aplicaciones estén desplegadas tendrás:

✅ **Backend API** funcionando independientemente  
✅ **Frontend SPA** con su propio dominio  
✅ **SSL automático** en ambos servicios  
✅ **Monitoreo** y health checks configurados  
✅ **Escalabilidad** independiente por servicio

¡Tu aplicación Full-Stack está lista para producción! 🚀
