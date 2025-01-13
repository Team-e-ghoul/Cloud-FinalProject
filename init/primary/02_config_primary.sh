#!/bin/bash
set -e

echo "Appending pg_hba.conf rules for replication..."

# Append the rule that allows replication connections from your Docker network
echo "host    replication    replica_user    0.0.0.0/0    md5" >> "$PGDATA/pg_hba.conf"

pg_ctl -D "$PGDATA" reload
