FROM php:8.3-fpm-alpine

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY ./ /var/www/backend
WORKDIR /var/www/backend

#RUN composer install --optimize-autoloader --no-dev

ARG PUID=1000
ARG PGID=1000

RUN apk --no-cache add shadow && \
    groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

CMD php-fpm

EXPOSE 9000
