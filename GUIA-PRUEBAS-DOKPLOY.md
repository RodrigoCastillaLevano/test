# 🚀 GUÍA RÁPIDA: Despliegue en Dokploy

## 📋 Resumen de Ramas Disponibles

| Rama              | Propósito                              | Configuración         |
| ----------------- | -------------------------------------- | --------------------- |
| `main`            | Desarrollo completo con Docker Compose | Todos los servicios   |
| `backend-deploy`  | Solo Backend API                       | Puerto 3001, `/api/*` |
| `frontend-deploy` | Solo Frontend React                    | Puerto 80, SPA        |

## 🔗 URLs del Repositorio

- **Repositorio**: https://github.com/RodrigoCastillaLevano/test.git
- **Rama Backend**: `backend-deploy`
- **Rama Frontend**: `frontend-deploy`

---

## 🎯 PASO 1: Desplegar Backend

### 1.1 Crear Aplicación Backend

```
Tipo: Docker Application
Nombre: sistema-academico-backend
```

### 1.2 Configurar Repositorio

```
Repository URL: https://github.com/RodrigoCastillaLevano/test.git
Branch: backend-deploy
Build Context: backend/
Dockerfile: Dockerfile
```

### 1.3 Variables de Entorno

```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:hivl3wcednpboa6y@137.184.140.170:5432/postgres
JWT_SECRET=mi_jwt_secret_super_seguro_2024
FRONTEND_URL=https://TU-DOMINIO-FRONTEND.com
```

### 1.4 Configurar Dominio

```
Service Port: 3001
Domain: sistema-academico-api.TU-DOMINIO.com
Path: /
```

### 1.5 Deploy y Verificar

- Click "Deploy"
- Verificar logs
- Probar: `https://sistema-academico-api.TU-DOMINIO.com/api/health`

---

## 🎯 PASO 2: Desplegar Frontend

### 2.1 Crear Aplicación Frontend

```
Tipo: Docker Application
Nombre: sistema-academico-frontend
```

### 2.2 Configurar Repositorio

```
Repository URL: https://github.com/RodrigoCastillaLevano/test.git
Branch: frontend-deploy
Build Context: frontend/
Dockerfile: Dockerfile
```

### 2.3 Variables de Entorno

```bash
REACT_APP_API_URL=https://sistema-academico-api.TU-DOMINIO.com/api
NODE_ENV=production
```

### 2.4 Build Arguments (¡Importante!)

```bash
REACT_APP_API_URL=https://sistema-academico-api.TU-DOMINIO.com/api
```

### 2.5 Configurar Dominio

```
Service Port: 80
Domain: sistema-academico.TU-DOMINIO.com
Path: /
```

### 2.6 Deploy y Verificar

- Click "Deploy"
- Verificar logs de build
- Probar: `https://sistema-academico.TU-DOMINIO.com`

---

## 🧪 PRUEBAS DE VERIFICACIÓN

### ✅ Backend Tests

```bash
# Health check
curl https://sistema-academico-api.TU-DOMINIO.com/api/health

# Login test
curl -X POST https://sistema-academico-api.TU-DOMINIO.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}'

# Cursos test
curl https://sistema-academico-api.TU-DOMINIO.com/api/cursos
```

### ✅ Frontend Tests

1. Abrir en navegador: `https://sistema-academico.TU-DOMINIO.com`
2. Verificar que carga la página de login
3. Login con: `admin@demo.com` / `admin123`
4. Verificar que muestra dashboard con cursos
5. Probar crear/editar curso

### ✅ Integración Tests

1. Frontend puede hacer login
2. Frontend muestra lista de cursos
3. CORS funciona correctamente
4. JWT authentication funciona

---

## 🐛 Troubleshooting Común

### Backend Issues:

- **Database Connection**: Verificar DATABASE_URL
- **CORS Error**: Actualizar FRONTEND_URL con dominio correcto
- **Port Issues**: Confirmar puerto 3001

### Frontend Issues:

- **API Error**: Verificar REACT_APP_API_URL en build args
- **Build Failure**: Revisar logs de Node.js build
- **Routing Issues**: Nginx configurado para SPA

### Integration Issues:

- **CORS**: Backend debe permitir dominio del frontend
- **SSL**: Ambos servicios deben usar HTTPS
- **Network**: Verificar que ambos servicios están accesibles

---

## 📊 Datos de Prueba

### Credenciales:

- **Email**: admin@demo.com
- **Password**: admin123

### Cursos Disponibles:

- Fundamentos de Programación - S/ 850.00
- Estructura de Datos - S/ 920.00
- Base de Datos I - S/ 870.00
- Desarrollo Web - S/ 950.00
- (6 cursos más...)

---

## 🎉 ¡Éxito!

Si ambos servicios están funcionando:

1. ✅ Backend API responde en `/api/health`
2. ✅ Frontend carga correctamente
3. ✅ Login funciona
4. ✅ Lista de cursos se muestra
5. ✅ CRUD de cursos operativo

**¡El proyecto está listo para la demostración en la capacitación!**

---

## 📞 Comandos de Diagnóstico

```bash
# Ver logs del backend
docker logs [backend-container-id]

# Ver logs del frontend
docker logs [frontend-container-id]

# Test de conectividad
ping sistema-academico-api.TU-DOMINIO.com
ping sistema-academico.TU-DOMINIO.com
```
