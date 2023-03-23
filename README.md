# Проект по поиску фильмов: Movies-Siroja.

### Ссылка на сайт размещенный на сервере: https://movies-siroja.nomoredomains.rocks/
### Api: https://api.movies-siroja.nomoredomains.club/
### Frontend: https://github.com/SirojaSB/movies-explorer-frontend

## Описание:

"Movies Siroja" - это приложение схоже по функционалу с онлайн кинотеатром. В данном сервисе
реализована возможность аутентификации пользователей, сохранения фильмов в избранном и поиском фильмов по ключевым словам.

## Стек технологий:

- Expressjs
- nodemon
- MongoDB
- mongoose
- dotenv
- cors
- celebrate
- bcryptjs
- express-rate-limit
- winston
- express-winston
- helmet

## Методы и роуты

Метод | Роут | Описание
----- |------|---------
GET | `/users/me` | возвращает **email** и **имя**
PATCH | `/users/me` | обновляет информацию о пользователе с переданными в `body` **email** и **имя**
POST | `/movies` | создаёт фильм с передаными в `body` **country**, **director**, **duration**, **year**, **description**, **image*, **trailer**, **nameRU**, **nameEN**, **movieId** и **thumbnail**
GET | `/movies` | возвращает все сохранённые пользователем фильмы
DELETE | `/movies/movieId` | удаляет сохранённый фильм по его **_id**
POST | `/signup` | создает пользователя с передаными в `body` **email**, **password**, **name**
POST | `/signin` | проверяет переданные в `body` **email** и **password** и возвращает **JWT**
