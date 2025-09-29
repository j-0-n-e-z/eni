FROM node:20-alpine

WORKDIR /app

COPY ./backend ./backend
COPY ./shared/ ./shared

RUN echo "=== CHECKING SHARED FOLDER ==="
RUN find . -name "*.ts" | grep shared | head -10 || echo "No shared TS files found"
RUN ls -la shared/ || echo "Shared folder missing or empty"
RUN echo "=== CHECKING SRT FILES ==="
RUN find . -name "*srt*" -type f | head -10 || echo "No SRT files found"

WORKDIR /app/backend

RUN ls -la src/utils/srt/ || echo "SRT folder not found"

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 8080
CMD ["npx", "tsx", "src/index.ts"]