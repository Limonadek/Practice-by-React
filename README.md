# Practice-by-React

## Шаги для запуска на локалке

- Склонировать репозиторий git clone
- Установить docker и docker-compose если его нету
- В папке backend создать файл .env и заполнить следующими переменными  
```
POSTGRES_PORT=37875
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

APP_NAME=project
REDIS_PORT=26599
APP_PORT=4002
```
- Находясь в папке backend выполнить команду(в зависимости от версии docker-compose) docker-compose up --build или docker compose up --build
- Находясь в папке my-app выполнить команду npm run start