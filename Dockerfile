FROM node:18.16-alpine3.17

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "/app/lib/server.js"]