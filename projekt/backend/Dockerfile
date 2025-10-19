FROM node:18

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


EXPOSE 3000
ENV MONGO_URI=mongodb://admin:nimda@mongodb:27017/testdb?authSource=admin

ENTRYPOINT ["/wait-for-it.sh", "mongodb:27017", "-t", "60", "--", "node", "server.js"]