# event-map

### Развертывание проекта
Должны быть установлены:
- docker
- node 18

Выполнить команду:
```shell
sh init.sh
```

Остановка docker compose:
```shell
docker compose down
```

Запуск наполнителей БД:
```shell
docker exec php-fpm php artisan db:seed
```

Запуск сборки фронта:
```shell
docker exec frontend npm run start
```
