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
