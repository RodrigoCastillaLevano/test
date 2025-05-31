# 🎨 Frontend - Sistema de Gestión Académica

Aplicación React para gestión de cursos académicos con interfaz moderna y responsiva.

## 📋 Características

- ✅ **React 18** - Última versión con hooks
- ✅ **Context API** - Gestión de estado global
- ✅ **Componentes Modernos** - UI limpia y responsiva
- ✅ **Autenticación** - Login/logout con JWT
- ✅ **CRUD Interactivo** - Gestión completa de cursos
- ✅ **Docker Multi-stage** - Build optimizado para producción
- ✅ **Nginx** - Servido con configuración optimizada

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENV=production
REACT_APP_TITLE=Sistema de Gestión Académica
```

## 🚀 Ejecución Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Build para producción
npm run build

# Servir build localmente
npx serve -s build
```

## 🐳 Docker

```bash
# Build de la imagen (multi-stage)
docker build -t frontend-gestion .

# Ejecutar contenedor
docker run -p 80:80 frontend-gestion
```

## 📱 Componentes Principales

### 🔐 Autenticación

- **Login.js** - Formulario de inicio de sesión
- **AuthContext.js** - Gestión global de autenticación

### 📚 Gestión de Cursos

- **Dashboard.js** - Panel principal
- **CursosList.js** - Lista y búsqueda de cursos
- **CursoForm.js** - Formulario crear/editar cursos

### 🎨 Estilos

- **CSS Modules** - Estilos modulares por componente
- **Responsive Design** - Adaptable a móviles y desktop
- **UI/UX Moderno** - Interfaz intuitiva y atractiva

## 🔗 Integración con Backend

### API Calls:

```javascript
// Login
POST ${API_URL}/auth/login

// Obtener cursos
GET ${API_URL}/cursos

// Crear curso
POST ${API_URL}/cursos

// Actualizar curso
PUT ${API_URL}/cursos/:id

// Eliminar curso
DELETE ${API_URL}/cursos/:id
```

## 🎯 Funcionalidades

### ✨ Dashboard Principal

- Lista de cursos con precios en soles
- Búsqueda y filtrado
- Acciones rápidas (editar/eliminar)

### ✨ Gestión de Cursos

- Formulario dinámico
- Validación en tiempo real
- Retroalimentación visual
- Manejo de errores

### ✨ Autenticación

- Login persistente
- Protección de rutas
- Logout seguro
- Estados de carga

## 📊 Datos de Ejemplo

El sistema muestra 10 cursos precargados:

- **Fundamentos de Programación** - S/ 850.00
- **Desarrollo Web** - S/ 950.00
- **Base de Datos I** - S/ 870.00
- Y más cursos de Ingeniería de Sistemas...

## 🔧 Desarrollo

### Scripts disponibles:

- `npm start` - Ejecutar en desarrollo (puerto 3000)
- `npm run build` - Build para producción
- `npm test` - Ejecutar tests
- `npm run eject` - Eject configuración CRA

### Estructura del proyecto:

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── context/        # Context API
│   ├── App.js         # Componente principal
│   └── index.js       # Punto de entrada
├── public/            # Archivos públicos
├── build/             # Build de producción
├── Dockerfile         # Multi-stage build
├── nginx.conf         # Configuración Nginx
└── package.json       # Dependencias
```

## 🚀 Deploy en Dokploy

1. **Crear aplicación** tipo `Application`
2. **Repository**: `https://github.com/RodrigoCastillaLevano/test.git`
3. **Build Path**: `/frontend`
4. **Port**: `80`
5. **Variables**: Configurar `REACT_APP_API_URL`

¡Listo para producción! 🎉

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
