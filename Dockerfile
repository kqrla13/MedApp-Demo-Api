FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependencias primero (mejor cache)
COPY package.json yarn.lock ./
COPY prisma ./prisma/
COPY swagger.yaml ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Build de la app
RUN yarn build


FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario del builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/swagger.yaml ./
COPY --from=builder /app/dist ./dist

EXPOSE 4444

CMD ["yarn", "start"]
