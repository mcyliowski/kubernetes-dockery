FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=nimda

COPY init-mongo.js /docker-entrypoint-initdb.d/

VOLUME /data/db