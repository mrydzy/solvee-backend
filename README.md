Decisions API
============

Quickstart
----------

Before running local API you have to set `DATABASE_URL={databaseUri}` environment variable in order to connect with your postgres database, where `{databaseUri}` is your local/remote database uri.

If you will choose local vagrant with postgres database from this repo, your `DATABASE_URL` will look like these: `postgres://dev:dev@localhost:5432/comments`

If you want to connect with some heroku remote database from your local machine, in addition to heroku database uri, you will need also `FORCE_DB_SSL=true`.

You can achieve this by editing your IDE runtime configuration, or creating `.env` file and placing it there. When you finally set these variables, just type:

- `npm install`
- `vagrant up`
- `npm start`


Local Database
--------------

You can use PostgreSQL database on Vagrant.

Vagrant forward port `5432` so you can run NodeJS app locally and connect to DB with URI: `localhost:5432/comments`

Requirements:

* [VirtualBox](https://www.virtualbox.org/)
* [Vagrant](https://www.vagrantup.com/)
** [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest) - A Vagrant plugin to keep your VirtualBox Guest Additions up to date

Databases:

* `decisions` - core decisions database
* `decisions_test` - test decisions database

Users:

* `dev:dev` - superuser for developer
* `api:api` - user for API with privileges: `select`, `update`, `insert`, `delete`
* `deploy:deploy` - user for deployment tool (with full privileges)
