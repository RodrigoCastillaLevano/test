# Sistema Académico - Frontend React

## 🚀 Despliegue en Dokploy - Solo Frontend

Esta rama está optimizada para desplegar únicamente el frontend del sistema académico.

### 📋 Configuración de Despliegue

**Tipo de Aplicación**: Docker Application
**Puerto**: 80 (Nginx)
**Health Check**: `/`

### 🔧 Variables de Entorno Requeridas

```bash
REACT_APP_API_URL=https://sistema-academico-api.tu-dominio.com/api
NODE_ENV=production
```

### 🐳 Dockerfile

El frontend utiliza un build multi-stage:

1. **Build Stage**: Node.js para compilar React
2. **Production Stage**: Nginx Alpine para servir archivos estáticos

### 🌐 Nginx Configuration

- Puerto 80
- Configuración SPA (Single Page Application)
- Compresión gzip habilitada
- Headers de seguridad
- Fallback a index.html para rutas de React

### 📱 Funcionalidades

- **Autenticación**: Login/logout con JWT
- **Dashboard**: Vista principal con estadísticas
- **Gestión de Cursos**: CRUD completo
- **Responsive Design**: Compatible con móviles
- **Context API**: Gestión de estado global

### 🎨 Tecnologías

- React 18
- Context API
- CSS3 moderno
- Responsive Design
- SPA Navigation

### 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm start

# Build para producción
npm run build

# Servir build localmente
npx serve -s build
```

### 🔗 API Integration

El frontend se conecta al backend mediante:

- Variable de entorno `REACT_APP_API_URL`
- Autenticación JWT en headers
- Manejo de errores centralizado
- Context API para estado global

### 📊 Datos de Ejemplo

El sistema muestra 10 cursos de Ingeniería de Sistemas:

- Fundamentos de Programación - S/ 850.00
- Estructura de Datos - S/ 920.00
- Base de Datos I - S/ 870.00
- Desarrollo Web - S/ 950.00
- Y más...

## 🚀 Pasos para Desplegar en Dokploy

1. **Crear Nueva Aplicación**

   - Tipo: Docker Application
   - Nombre: `sistema-academico-frontend`

2. **Configurar Repositorio**

   - URL: `https://github.com/RodrigoCastillaLevano/test.git`
   - Branch: `frontend-deploy`
   - Build Context: `frontend/`
   - Dockerfile: `Dockerfile`

3. **Variables de Entorno**

   ```bash
   REACT_APP_API_URL=https://tu-backend-domain.com/api
   NODE_ENV=production
   ```

4. **Build Arguments** (Importante para React)

   ```bash
   REACT_APP_API_URL=https://tu-backend-domain.com/api
   ```

5. **Dominio**

   - Configurar dominio personalizado
   - Ejemplo: `sistema-academico.tu-dominio.com`

6. **Deploy**
   - Hacer deploy y verificar logs
   - Probar acceso en el navegador

### ⚠️ Importante

- **Desplegar Backend Primero**: El frontend necesita la URL del backend
- **CORS**: Asegurarse que el backend permita requests desde el dominio del frontend
- **Variables de Build**: React necesita las variables en tiempo de build

### 🔐 Credenciales de Prueba

Una vez desplegado, usar estas credenciales:

- **Email**: admin@demo.com
- **Password**: admin123

---

**Nota**: Esta rama contiene solo el frontend. Para el backend, usar la rama `backend-deploy`.

## 🔗 Dependencias

- **Backend API**: Debe estar desplegado y accesible
- **Base de Datos**: PostgreSQL externa ya configurada
- **Dominios**: Configurar ambos servicios con dominios válidos
