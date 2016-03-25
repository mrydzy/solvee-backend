#!/usr/bin/env bash

# load env variables if local .env file exist
if [ -a .env ] ; then
  source .env;
  export DATABASE_URL=$DB_TEST_LOCAL_URI;
  export SIG_HEADER=$SIG_HEADER_TEST;
  export SPID_SIG_SECRET_BT=$SPID_SIG_SECRET_TEST;
fi

export LOGGING_DISABLED=true;

# run mocha test runner
mocha