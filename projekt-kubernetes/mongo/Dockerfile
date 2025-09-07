FROM mongo:8.0.14-rc0

COPY init-mongo.js /docker-entrypoint-initdb.d/

ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=nimda \
    MONGO_INITDB_DATABASE=testdb

EXPOSE 27017

