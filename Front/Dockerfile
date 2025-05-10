# Используем официальный образ Node.js
FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение для production
RUN npm run build:prod

# Указываем порт, который будет использоваться
EXPOSE 5000

# Запускаем приложение
CMD ["npm", "start"]