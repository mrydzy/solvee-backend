#!/usr/bin/env bash

# load env variables if local .env file exist
if [ -a .env ] ; then
  source .env;
  export DATABASE_URL=$DB_TEST_LOCAL_URI;
  export SIG_HEADER=$SIG_HEADER;
  export SPID_SIG_SECRET=$SPID_SIG_SECRET;
fi

export LOGGING_DISABLED=true;

# run tests coverage
istanbul cover _mocha -- -R progress