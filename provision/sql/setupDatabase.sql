CREATE SCHEMA decisions;
CREATE SCHEMA decisions_test;

alter user dev with encrypted password 'dev';
GRANT ALL ON SCHEMA decisions TO dev;
GRANT ALL ON SCHEMA decisions_test TO dev;

alter user api with encrypted password 'api';
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA decisions TO api;
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA decisions_test TO api;

alter user deploy with encrypted password 'deploy';
GRANT ALL ON SCHEMA decisions TO deploy;
GRANT ALL ON SCHEMA decisions_test TO deploy;