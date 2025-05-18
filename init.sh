#!/bin/bash

docker compose up -d --build

docker exec php-fpm composer install
docker exec php-fpm php artisan migrate
docker exec php-fpm php artisan l5-swagger:generate

docker exec frontend npm ci
docker exec frontend npm run build
