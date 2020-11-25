# nodejs-recruitment-task-2
Instalacja paczek: 

npm install

Konfiguracja bazy danych:

config/config.json

Utworzenie tabel:

npx sequelize db:migrate


Włączenie testów:
npm test

Włączenie aplikacji:
npm start

Endpointy do przetestowania w wersji online:

POST /movies: 

http://176.107.131.27:6000/movies?title=batman

GET /movies: 

http://176.107.131.27:6000/movies

POST /comments: 

http://176.107.131.27:6000/comments

(movieId i comment wymagane w body)
movieId:32b1dd98-f6de-43fc-84d6-badb577ae375,comment:'new comment'

GET /comments: 

http://176.107.131.27:6000/comments?movieId=32b1dd98-f6de-43fc-84d6-badb577ae375
