FROM postgres:13-alpine

COPY .env.production /tmp/.env.production
RUN set -a && . /tmp/.env.production && set +a

ENV POSTGRES_USER=${DB_USERNAME} \
    POSTGRES_PASSWORD=${DB_PASSWORD} \
    POSTGRES_DB=${DB_DATABASE}

EXPOSE 5432
