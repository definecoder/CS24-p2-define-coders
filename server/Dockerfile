
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y postgresql-client

COPY . .

EXPOSE 8585

CMD ["sh", "-c", "until pg_isready -h postgres -p 5432; do sleep 1; done && npm i && npm run dev"]
# CMD ["npx", "nodemon"]
