FROM php:8.3-fpm-alpine

RUN apk update && apk add --no-cache libpq-dev shadow

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN install-php-extensions sockets pdo pdo_pgsql

ARG PUID=1000
ARG PGID=1000
RUN groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

WORKDIR /var/www/backend
COPY ./ /var/www/backend

EXPOSE 9000

CMD php-fpm
