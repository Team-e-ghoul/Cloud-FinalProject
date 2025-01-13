const { Pool } = require('pg');

const poolPrimary = new Pool({
  user: process.env.DB_USER || 'default_user',
  host: process.env.PRIMARY_HOST || 'pg-primary',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD || 'default_password',
  port: 5432,
});

const poolReplica = new Pool({
  user: process.env.DB_USER || 'default_user',
  host: process.env.REPLICA_HOST || 'pg-replica',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD || 'default_password',
  port: 5433,
});

const poolReplica2 = new Pool({
  user: process.env.DB_USER || 'default_user',
  host: process.env.REPLICA_HOST2 || 'pg-replica',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD || 'default_password',
  port: 5434,
});

module.exports = {
  poolPrimary,
  poolReplica,
  poolReplica2
};
