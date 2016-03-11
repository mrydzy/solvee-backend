#!/usr/bin/env bash

# load env variables if local .env file exist
if [ -a .env ] ; then
  source .env;
  export DATABASE_URI=$DATABASE_URI;
fi

# migrate database
sequelize db:migrate