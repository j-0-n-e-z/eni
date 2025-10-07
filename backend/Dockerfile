FROM node:20-alpine

WORKDIR /app

COPY ./backend ./backend
COPY ./shared/ ./shared

WORKDIR /app/backend

RUN npm ci --ignore-scripts --no-cache

RUN npx prisma generate

RUN npm run build

RUN npm prune --production

EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]
