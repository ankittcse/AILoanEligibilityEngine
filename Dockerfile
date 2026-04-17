FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4173
EXPOSE 5000

CMD sh -c "node server.js & npm run dev -- --host 0.0.0.0 --port 4173"