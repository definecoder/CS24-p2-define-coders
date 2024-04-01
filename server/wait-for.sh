#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U postgres -d ecosync -c '\q'; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing command"
exec $cmd
