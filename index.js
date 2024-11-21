const { Command } = require('commander');
const express = require('express');

// Ініціалізація командного інтерфейсу
const program = new Command();
program
  .option('-h, --host <host>', 'адреса сервера')
  .option('-p, --port <port>', 'порт сервера')
  .option('-c, --cache <cachePath>', 'шлях до кеш-директорії')
  .parse(process.argv);

// Отримуємо аргументи
const options = program.opts();
const { host, port, cache } = options;

// Перевірка кеш-директорії
const fs = require('fs');
if (!fs.existsSync(cache)) {
  console.error(`Кеш-директорія "${cache}" не існує!`);
  process.exit(1);
}

// Ініціалізація веб-сервера
const app = express();

app.get('/', (req, res) => {
  res.send('Веб-сервер працює!');
});

// Запуск сервера
app.listen(port, host, () => {
  console.log(`Сервер запущено на http://${host}:${port}`);
});
