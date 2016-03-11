Comments API
============

[![Build Status](https://travis.schibsted.io/bergens-tidende/comments-api.svg?token=wvrkpp6gtp3KbkBahizL)](https://travis.schibsted.io/bergens-tidende/comments-api)

API for comments system, build on Node.js, hosted on heroku.

Tech stack
--------

A short summary of technologies used:

- HTTP server - [hapijs.com](http://hapijs.com)
  - logger - [bunyan](https://github.com/trentm/node-bunyan)
  - schema validator - [joi](https://github.com/hapijs/joi)
  - HTTP friendly error handler - [boom](https://github.com/hapijs/boom)
- API documentation - [swagger](http://swagger.io/)
  - swagger interface for hapi - [hapi-swagger](https://github.com/glennjones/hapi-swagger)
  - static files and directory handler - [inert](https://github.com/hapijs/inert)
  - templates rendering - [vision](https://github.com/hapijs/vision)
- Database - [postgres](http://www.postgresql.org/)
- ORM - [sequelizejs.com](http://sequelizejs.com)
  - migrations via sequelize CLI - [sequelize-cli](https://github.com/sequelize/cli)

Download
--------

`git clone git@github.schibsted.io:bergens-tidende/comments-api.git`


Quickstart
----------

Before running local API you have to set `DB_URI={databaseUri}` environment variable in order to connect with your postgres database, where `{databaseUri}` is your local/remote database uri.

If you will choose local vagrant with postgres database from this repo, your `DB_URI` will look like these: `postgres://dev:dev@localhost:5432/comments`

If you want to connect with some heroku remote database from your local machine, in addition to heroku database uri, you will need also `FORCE_DB_SSL=true`.

You can achieve this by editing your IDE runtime configuration, or creating `.env` file and placing it there. When you finally set these variables, just type:

- `npm install`
- `vagrant up`
- `npm start`

For authorized requests (f.ex. POST method - comments creation) you will need `SPID_SIG_SECRET_{PUBLICATION}` (e.g. `SPID_SIG_SECRET_BT`) env variable which is required to auth using the SPiD lib.

Local Database
--------------

You can use PostgreSQL database on Vagrant.

Vagrant forward port `5432` so you can run NodeJS app locally and connect to DB with URI: `localhost:5432/comments`

Requirements:

* [VirtualBox](https://www.virtualbox.org/)
* [Vagrant](https://www.vagrantup.com/)
** [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) - A Vagrant plugin to keep your VirtualBox Guest Additions up to date

Databases:

* `comments` - core comments database
* `comments_test` - test comments database

Users:

* `dev:dev` - superuser for developer
* `api:api` - user for API with privileges: `select`, `update`, `insert`, `delete`
* `deploy:deploy` - user for deployment tool (with full privileges)

Sample data
--------

You can fill your local database with sample data by running seeders:

`npm run db:seed`

Website (aliases)
----------
[http://comment-api.herokuapp.com/documentation](http://comment-api.herokuapp.com/documentation)
