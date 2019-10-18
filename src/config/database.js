require('dotenv').config({
  path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env'
})

module.exports = {
  dev: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscore: true
    },
    quoteIdentifiers: false
  },
  prod: {
    use_env_variable: 'DATABASE_URL'
  }
}
