FROM node:20-alpine

WORKDIR /app

COPY ./backend ./backend
COPY ./shared/ ./shared

WORKDIR /app/backend

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]