# Base image para Node.js
FROM node:20-alpine

# Instala o SQLite
RUN apk add --no-cache sqlite

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

RUN npm install -g prisma

RUN npx prisma generate

# Build do TypeScript
RUN npm run build

ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

# Expõe a porta 8080
EXPOSE 8080

# Comando para rodar o backend
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
