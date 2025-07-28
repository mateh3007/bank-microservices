FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas arquivos necessários para instalação
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY src ./src/

RUN npm install
RUN npm run build
RUN npx prisma generate

# Etapa 2: imagem final
FROM node:20-alpine
WORKDIR /app

# Copia os arquivos da build anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production

CMD ["node", "dist/main"]
