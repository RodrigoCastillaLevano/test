FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Definir variable de puerto
ENV PORT=3001

# Exponer puerto
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
