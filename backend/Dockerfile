FROM node:16.17.1

WORKDIR /app/backend

EXPOSE 3001

COPY ./package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["sh", "-c", "npm start"]

