# Base image para Node.js
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta
EXPOSE 4173

# Comando padrão do nginx
CMD ["sh","-c", "npm run dev"]
