# 🚀 Configuración Exacta para Dokploy

## ✅ Configuración Frontend

### 1. Application Settings

- **Name**: `sistema-academico-frontend`
- **Description**: `Frontend React del Sistema Académico`

### 2. Source Configuration

- **Repository URL**: `https://github.com/RodrigoCastillaLevano/test.git`
- **Branch**: `main` (o `frontend-deploy` si existe)
- **Auto Deploy**: ✅ Enabled

### 3. Build Configuration

- **Build Type**: `Dockerfile` ⭐ (IMPORTANTE: No usar Nixpacks)
- **Dockerfile Path**: `frontend/Dockerfile`
- **Docker Context Path**: `frontend`
- **Docker Build Stage**: (dejar vacío)

### 4. Build Arguments (CRÍTICO para React)

```bash
REACT_APP_API_URL=https://tu-backend-domain.com/api
```

### 5. Environment Variables

```bash
NODE_ENV=production
REACT_APP_API_URL=https://tu-backend-domain.com/api
```

### 6. Port Configuration

- **Port**: `80`
- **Expose Port**: ✅ Enabled

### 7. Domains

- **Domain**: `sistema-academico.tu-dominio.com`
- **Path**: `/`
- **Port**: `80`

---

## ✅ Configuración Backend

### 1. Application Settings

- **Name**: `sistema-academico-backend`
- **Description**: `API Express del Sistema Académico`

### 2. Source Configuration

- **Repository URL**: `https://github.com/RodrigoCastillaLevano/test.git`
- **Branch**: `main` (o `backend-deploy` si existe)
- **Auto Deploy**: ✅ Enabled

### 3. Build Configuration

- **Build Type**: `Dockerfile` ⭐ (IMPORTANTE: No usar Nixpacks)
- **Dockerfile Path**: `backend/Dockerfile`
- **Docker Context Path**: `backend`
- **Docker Build Stage**: (dejar vacío)

### 4. Environment Variables

```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres
JWT_SECRET=mi_jwt_secret_super_seguro_2024
FRONTEND_URL=https://sistema-academico.tu-dominio.com
```

### 5. Port Configuration

- **Port**: `3001`
- **Expose Port**: ✅ Enabled

### 6. Domains

- **Domain**: `sistema-academico-api.tu-dominio.com`
- **Path**: `/`
- **Port**: `3001`

### 7. Health Check

- **Health Check Path**: `/api/health`
- **Health Check Port**: `3001`

---

## 🔄 Orden de Despliegue

1. **Desplegar BACKEND primero**

   - Configurar con dominio temporal o IP
   - Verificar que `/api/health` responda

2. **Desplegar FRONTEND segundo**
   - Usar la URL del backend en `REACT_APP_API_URL`
   - Verificar que la aplicación cargue

---

## 🧪 Verificación Post-Despliegue

### Backend:

```bash
curl https://tu-backend-domain.com/api/health
curl https://tu-backend-domain.com/api/cursos
```

### Frontend:

- Abrir navegador: `https://tu-frontend-domain.com`
- Login con: `admin@demo.com` / `admin123`
- Verificar que cargue la lista de cursos

---

## ❌ Errores Comunes

### 1. "Nixpacks was unable to generate a build plan"

**Solución**: Cambiar Build Type a "Dockerfile"

### 2. "No such file or directory: package.json"

**Solución**: Verificar Docker Context Path (debe ser `frontend` o `backend`)

### 3. Frontend no conecta con Backend

**Solución**:

- Verificar `REACT_APP_API_URL` en Build Arguments
- Verificar CORS en backend
- Verificar que ambos dominios estén funcionando

### 4. "Module not found" en React build

**Solución**:

- Verificar que `REACT_APP_API_URL` esté en Build Arguments
- Re-deploy después de cambiar variables

---

## 📋 Checklist Pre-Despliegue

- [ ] Repositorio actualizado en GitHub
- [ ] Branch seleccionado correctamente
- [ ] Build Type = "Dockerfile"
- [ ] Docker Context Path correcto
- [ ] Environment Variables configuradas
- [ ] Build Arguments configurados (para frontend)
- [ ] Dominios configurados
- [ ] Puertos expuestos

---

## 🔗 URLs de Prueba

Una vez desplegado:

- **Frontend**: https://tu-dominio.com
- **Backend API**: https://api.tu-dominio.com/api/health
- **Backend Cursos**: https://api.tu-dominio.com/api/cursos

**Credenciales**: admin@demo.com / admin123
