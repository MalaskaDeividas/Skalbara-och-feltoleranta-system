FROM node:19.9.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY src/ ./src/
COPY tsconfig.json ./

EXPOSE 8080

CMD ["npm", "start"]
