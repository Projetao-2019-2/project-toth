FROM node:10-slim

WORKDIR /app

COPY package.json .

RUN npm install -y

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
