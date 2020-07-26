#!/usr/bin/env bash

createdb $DB_NAME
createuser $DB_DEV_USER $DB_ROLE

psql -tAc "ALTER ROLE $DB_DEV_USER WITH PASSWORD $DB_DEV_PASSWORD"
psql --u $DB_DEV_USER $DB_NAME -h 127.0.0.1 -f create_db.sql
