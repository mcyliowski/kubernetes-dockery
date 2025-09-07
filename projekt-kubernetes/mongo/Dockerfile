FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb.gpg] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" > /etc/apt/sources.list.d/mongodb-org.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /data/db && \
    useradd -r -M -s /bin/false mongodb && \
    chown -R mongodb:mongodb /data/db && \
    chmod -R 755 /data/db

COPY mongo/init-mongo.js /docker-entrypoint-initdb.d/

ENV MONGO_INITDB_ROOT_USERNAME=admin && \
    MONGO_INITDB_ROOT_PASSWORD=nimda

EXPOSE 27017

CMD ["mongod", "--bind_ip_all", "--auth", "--dbpath", "/data/db"]



