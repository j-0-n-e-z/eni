FROM node:20-alpine

WORKDIR /app

COPY ./frontend ./frontend
COPY ./shared/ ./shared

WORKDIR /app/frontend

RUN npm ci --only=production --ignore-scripts --no-cache

ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
