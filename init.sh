#!/bin/bash

docker compose up -d

docker exec php-fpm composer install
docker exec php-fpm php artisan migrate

docker exec frontend npm ci
docker exec frontend npm run build
