#!/usr/bin/env bash

# load env variables if local .env file exist
if [ -a .env ] ; then
  source .env;
  export DATABASE_URL=$DATABASE_URL;
fi

# migrate database
sequelize db:migrate