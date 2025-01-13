-- 01_init_primary.sql

-- Create a user for replication with REPLICATION privilege
CREATE ROLE replica_user WITH LOGIN REPLICATION PASSWORD 'replica_password';

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  product TEXT NOT NULL,
  quantity INT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN NOT NULL
);

INSERT INTO users (is_admin) VALUES (true);

ALTER SYSTEM SET wal_level = 'replica';
ALTER SYSTEM SET max_wal_senders = '3';
ALTER SYSTEM SET wal_keep_size = '64';
