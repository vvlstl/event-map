#!/bin/bash

docker compose up -d
docker exec php-fpm composer install
docker exec php-fpm php artisan migrate
