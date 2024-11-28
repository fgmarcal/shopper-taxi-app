# Teste Técnico - Shopper - Novembro 2024

## Taxi App!

Este repositório contém a aplicação **Taxi App**, desenvolvida como parte de um teste técnico em novembro de 2024. O sistema é totalmente dockerizado, usa SQLite para o banco de dados e já vem com dados pré-inseridos. A aplicação foi desenvolvida com as seguintes tecnologias:

- **TypeScript**
- **React**
- **Node.js**
- **Prisma ORM**
- **SQLite**
- **Vite**

---

## Funcionalidades

- Gerenciamento de motoristas e corridas.
- Integração com APIs externas utilizando uma chave de API configurável.
- Interface web responsiva para interação com o sistema.

---

## Pré-requisitos

- **Docker** e **Docker Compose** instalados em sua máquina.
- Uma chave de API válida do Google para o recurso de integração de mapas.

---

## Instruções para Configuração e Execução

### 1. **Clone o Repositório**

Baixe o repositório na sua máquina local com o comando:

```bash
git clone https://github.com/fgmarcal/shopper-taxi-app.git
cd shopper-taxi-app/
```

### 2. **Configuração da Chave de API**

Crie um arquivo .env na raiz do repositório e adicione a sua chave de API do Google no formato abaixo:

GOOGLE_API_KEY= "sua-chave-da-API"

### 3. **Inicialize o Projeto com Docker Compose**

```
docker compose up
```
ou utilize a flag -d para rodar em background

```
docker compose up -d
```

O Docker Compose irá construir as imagens e inicializar os contêineres do backend e frontend. Após a execução bem-sucedida, a aplicação estará disponível em:

Frontend: http://localhost

Backend: http://localhost:8080


## Informações Adicionais

- O banco de dados utilizado é o **SQLite**, e os dados necessários já estão pré-inseridos.
- As portas podem ser configuradas no arquivo `docker-compose.yml` se necessário.

