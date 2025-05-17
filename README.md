# event-map

### Развертывание проекта
Должен быть установлен docker

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
