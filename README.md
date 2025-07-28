# bank-microservices

# 💸 Sistema Financeiro - Microsserviços com NestJS

Este projeto é uma solução distribuída para gerenciamento de clientes, contas bancárias e transações financeiras. Foi desenvolvido como parte de um desafio técnico utilizando arquitetura de microsserviços.

## 🚀 Tecnologias Utilizadas

- **Node.js / NestJS** – Framework para aplicações escaláveis
- **Prisma ORM** – Manipulação de banco de dados PostgreSQL
- **PostgreSQL** – Banco de dados relacional
- **RabbitMQ** – Broker de mensageria para comunicação entre microsserviços
- **Docker / Docker Compose** – Contêineres e orquestração
- **Redis** – Cache e fila de tarefas (se necessário)

## 🧱 Arquitetura

- **Microsserviço de Clients**
  - Cadastro e autenticação de usuários
  - Gerenciamento de dados bancários

- **Microsserviço de Transactions**
  - Criação e listagem de transações financeiras
  - Comunicação com o serviço de clients via mensagens assíncronas


## 📬 Comunicação entre microsserviços
A comunicação entre os serviços é feita via RabbitMQ, utilizando mensagens assíncronas. Isso garante desacoplamento e escalabilidade.

## 🛡️ Padrões e Boas Práticas
- Clean Architecture
- SOLID principles
- DDD (Domain-Driven Design)
- DTOs e Validation com class-validator
- Repositórios injetáveis e testáveis

## ✍️ Autor
Feito com 💻 por Matheus Reis
