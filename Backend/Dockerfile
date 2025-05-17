FROM php:8.3-fpm-alpine

RUN apk add --no-cache libpq-dev shadow && \
    docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN install-php-extensions sockets

COPY ./ /var/www/backend
WORKDIR /var/www/backend

RUN chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache

RUN composer install --optimize-autoloader --no-dev

EXPOSE 9000

CMD php-fpm
