# like-trello-board

Awesome service which repeats the Trello.com

##How to use:
* Front: http://localhost:3010/
* API: http://localhost:3000

## for developers:
Service is powered by Docker, so it's quite easy to create the local environment.

### Steps:
* Clone this repo
* cd like-trello-board-node/config/
* cp config.example.json config.json
* cd ../..
* make install
* make run

### Regular use:
* make eslint to start lint
* make node-eslint to start lint for API part only
* make react-eslint to start lint for React part only
* make clear-db to clear tables on the db side. Just kill this process manually with cmd + C

### Issues:
* react-eslint issue. If you have an issue with linter, just execute "make clean" and "make install". This will fix the issue with linter for React part.

