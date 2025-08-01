# bank-microservices

## 💸 Sistema Financeiro - Microsserviços com NestJS

Este projeto é uma solução distribuída para gerenciamento de clientes, contas bancárias e transações financeiras. Foi desenvolvido como parte de um desafio técnico utilizando **arquitetura de microsserviços**, visando escalabilidade, manutenibilidade e boas práticas de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- **Node.js / NestJS** – Framework para aplicações escaláveis
- **Prisma ORM** – ORM utilizado para facilitar o desenvolvimento (preferência pessoal: TypeORM)
- **PostgreSQL** – Banco de dados relacional
- **RabbitMQ** – Broker de mensageria para comunicação assíncrona entre microsserviços
- **Docker / Docker Compose** – Contêineres e orquestração de todos os serviços
- **Redis** – Utilizado como cache (opcional)
- **Axios** – Comunicação HTTP entre API Gateway e microsserviços

---

## 🧱 Arquitetura

### Microsserviços

- **Clients Service**
  - Cadastro e autenticação de usuários
  - Gerenciamento de dados bancários
  - Arquitetura: **Clean Architecture**

- **Transactions Service**
  - Criação e listagem de transações financeiras
  - Comunicação assíncrona com o serviço de clients via RabbitMQ
  - Arquitetura: **Clean Architecture**

- **API Gateway**
  - Responsável por orquestrar as requisições e centralizar autenticação
  - Implementa o padrão MVC com **arquitetura modular**
  - Comunicação com outros microsserviços via **Axios**

---

## 📬 Comunicação entre Microsserviços

A comunicação entre os microsserviços é realizada por meio do **RabbitMQ**, utilizando **mensagens assíncronas**. Essa abordagem garante:

- **Desacoplamento**
- **Tolerância a falhas**
- **Escalabilidade horizontal**

---

## 🛠️ Execução Local

Para executar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/bank-microservices.git
   cd bank-microservices
Configure os arquivos .env de cada serviço. Certifique-se de utilizar os nomes dos serviços definidos no docker-compose.yml nas variáveis relacionadas ao host (por exemplo, DB_HOST=clients-db).

Execute todos os serviços com:

```bash
 docker-compose up --build
```

## 🛡️ Padrões e Boas Práticas
Clean Architecture (nos microsserviços)

MVC Modular (na API Gateway)

SOLID principles

Domain-Driven Design (DDD)

DTOs e validações com class-validator

Repositórios injetáveis e testáveis

Autenticação centralizada via API Gateway

## 🔒 Autenticação
A autenticação é realizada de forma centralizada na API Gateway, que:

Recebe a requisição de login

Encaminha-a para o serviço de clients utilizando Axios

Gera e devolve o token JWT

## ⚠️ Observações
Por questões de tempo, a funcionalidade de atualização de foto de perfil e a configuração com Amazon S3 não foram implementadas.

O Prisma foi utilizado neste projeto por sua agilidade e simplicidade, mas minha preferência em ambientes de produção é pelo TypeORM.

O deploy foi realizado em uma instância EC2 da AWS, rodando o projeto via Docker.

## ☁️ Deploy (sem Docker)
Caso o projeto fosse executado em produção sem Docker, o processo seria:

Acessar a EC2

```bash
ssh -i "seu-arquivo.pem" ubuntu@seu-ip
```

Instalar dependências
- Node.js
- npm/yarn
- pm2
- PostgreSQL
- RabbitMQ
- Redis (se necessário)

Clonar o repositório

```bash
git clone https://github.com/seu-usuario/bank-microservices.git
```

Instalar pacotes em cada serviço

```bash
cd clients
npm install
cd ../transactions
npm install
cd ../api-gateway
npm install
Configurar variáveis de ambiente
```

Rodar migrations do Prisma

```bash
npx prisma migrate deploy
```

Rodar os serviços com pm2

```bash
cd clients && pm2 start dist/main.js --name clients
cd ../transactions && pm2 start dist/main.js --name transactions
cd ../api-gateway && pm2 start dist/main.js --name api-gateway
```
Configurar domínio, SSL (Nginx + Certbot), CI/CD, etc.

## ✍️ Autor
Feito com 💻 por Matheus Reis
