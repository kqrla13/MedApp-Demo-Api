FROM node:18-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/
COPY swagger.yaml ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN yarn build


FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/swagger.yaml ./
COPY --from=builder /app/dist ./dist

EXPOSE 4444

CMD ["yarn", "start"]
