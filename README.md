# Multicontainer application

Codeching - video 8 - Dockerizing a React application with Node.js Postgres and NginX - dev and prod - step by step - PART 1

It contains React client, Node.js backend, PostgreSQL and Nginx

You can run it in development mode: docker-compose up --build
It contains Dockerfiles for client, server which you should push to your docker hub to be able
to pull them down when in next tutorial we will use them in Kubernetes.

## `client` ##

docker build -f Dockerfile.dev -t insightssoftware/pu-client .

Client part is based on React contenerized
docker run -it -p 4002:3000 insightssoftware/pu-multicient

docker build -f Dockerfile.dev -t lav/pu-multiserver .
docker run -it -p 4003:5000 lav/pu-multiserver

 docker-compose up --build


this is from jsconfig for more understandable routing of imports
// {
//     "compilerOptions": {
//         "baseUrl": "."
//     },
//     "include": ["src"]
// }

## `Postgres image` ##

psql -h postgres -U postgres
psql -U user --dbname=postgres
\d - Чтобы посмотреть все таблицы и записи
\dt - только таблицы

есть реплика она делает бэкап основной базы данных, предоставляет досттолько одному юзеру репликатор 


## `код запуска отдельного сервиса` ##

docker-compose stop -t 1 nginx 
docker-compose build nginx
docker-compose up --no-start nginx
docker-compose start nginx 


## notifications-worker ##
https://nodemailer.com
https://dzen.ru/video/watch/65cc83b712728b7e2a8b06c4?rid=1813541948.841.1717824047571.23455&t=4&utm_referrer=dzen.ru
у него есть только select доступ к бд
использую smpt host от mail.ru c паролем для сторонних приложений

