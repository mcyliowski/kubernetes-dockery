FROM node:18

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 3000
ENV MONGO_URI=mongodb://admin:nimda@mongo:27017/testdb?authSource=admin

CMD ["npm", "start"]