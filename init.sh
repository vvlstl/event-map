#!/bin/bash

docker compose up -d --build

docker exec php-fpm composer install
docker exec php-fpm php artisan migrate
docker exec php-fpm php artisan l5-swagger:generate

cd ./Front && npm ci && npm run build
