FROM mongo-express:1.0.2-20-alpine3.19

ENV ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    ME_CONFIG_MONGODB_ADMINPASSWORD=nimda \
    ME_CONFIG_MONGODB_SERVER=mongo \
    ME_CONFIG_MONGODB_AUTH_DATABASE=admin


FROM node:20-alpine3.19

RUN set -eux; \
    apk add --no-cache \
        bash \
        tini

WORKDIR /app

ARG MONGO_EXPRESS_REPOSITORY=mongo-express/mongo-express
ARG MONGO_EXPRESS_VERSION=release/v1.0.2

RUN set -eux; \
    apk add --no-cache --virtual .me-fetch-deps git; \
    git clone --depth 1 --branch "$MONGO_EXPRESS_VERSION" -c advice.detachedHead=false https://github.com/$MONGO_EXPRESS_REPOSITORY.git .; \
    export DISABLE_V8_COMPILE_CACHE=1; \
    yarn install; \
    yarn build; \
    yarn remove --all; \
    yarn workspaces focus --production; \
    yarn cache clean; \
    apk del --no-network .me-fetch-deps; \
    rm -rf .git* ~/.cache ~/.yarn

# override some config defaults with values that will work better for docker
ENV ME_CONFIG_MONGODB_URL="mongodb://admin:nimda@mongo:27017/?authSource=admin" \
    ME_CONFIG_MONGODB_ENABLE_ADMIN="true" \
    ME_CONFIG_SITE_SESSIONSECRET="secret" \
    ME_CONFIG_BASICAUTH=true \
    VCAP_APP_HOST="0.0.0.0"

EXPOSE 8081
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT [ "/sbin/tini", "--", "/docker-entrypoint.sh"]
CMD ["mongo-express"]