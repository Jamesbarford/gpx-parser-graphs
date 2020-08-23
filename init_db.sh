#!/usr/bin/env bash

function create_db {
  psql \
  -v ON_ERROR_STOP=1 \
  -h 127.0.0.1 \
  -U postgres \
<<-EOSQL
    CREATE ROLE
      "${DB_USER}"
    WITH
      LOGIN
      PASSWORD '${DB_PASSWORD}';

    CREATE DATABASE "${DB_NAME}";
    GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}" TO "${DB_USER}";

    \c "${DB_NAME}"
EOSQL
    psql -U "$DB_USER" "$DB_NAME" -h 127.0.0.1 -f ./server/App/db/create_db.sql
}

function user_check {
  user_check=$(PGPASSWORD="${PGPASSWORD}" psql \
	-v ON_ERROR_STOP=1 \
  -h 127.0.0.1 \
  -U postgres \
  -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'")

  if [ -z "${user_check}" ]; then
    echo "creating user"
    create_db
  fi
}

user_check
