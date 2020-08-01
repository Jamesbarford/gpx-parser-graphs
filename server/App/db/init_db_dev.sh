#!/usr/bin/env bash

createuser $DB_DEV_USER $DB_ROLE
psql -tc "ALTER ROLE $DB_DEV_USER WITH PASSWORD '$DB_DEV_PASSWORD';"

createdb $DB_NAME
psql --u $DB_DEV_USER $DB_NAME -h 127.0.0.1 -f create_db.sql
