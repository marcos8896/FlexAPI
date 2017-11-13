const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flex_admin_posgres',
  password: 'qwerty1234',
  port: 5432,
})

module.exports = pool;