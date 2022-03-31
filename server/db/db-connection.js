const { Pool } = require('pg');
const db = new Pool({
    connectionString: process.env.DB_URI
    //user:'postgres', database: 'techtonica1'
  // user: 'postgres',
  // host: 'localhost',
  // database: 'techtonica1',
  // port: '5432',
  });

  module.exports = db;

  // const pgp = require('pg-promise');
  // const db = pgp('postgres://localhost:5432/techtonica1')

  // module.export = db;