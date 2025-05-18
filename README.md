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

Заполнить БД моковыми данными:
```shell
docker exec php-fpm php artisan db:seed --class="\Database\Seeders\MockSeeder"
```

Заполнить БД фейковыми данными:
```shell
docker exec php-fpm php artisan db:seed --class="\Database\Seeders\FakeSeeder"
```

Запуск сборки фронта (нужен node 18):
```shell
npm ci && npm run start
```
