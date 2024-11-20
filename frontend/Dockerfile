# Base image para Node.js
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Build do projeto
RUN npm run build

# Imagem para servir os arquivos estáticos
FROM nginx:1.23-alpine

# Copia o build gerado
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
