/**
 * heroku pg:psql postgresql-encircled-82162 --app watch-ads-for-money-test
 */
module.exports = {
  development: {
    username: "fpeoercargymzc",
    password: "464f7afa2c5203362e654aad820aa256929c4b60113992a1a237b93ab2937042",
    database: "dehh6sv9b7vb5",
    host: "ec2-18-214-211-47.compute-1.amazonaws.com",
    dialect: "postgres",
    protocol: 'postgres',
    port: 5432,
    logging: true,
    sslmode: require,
    dialectOptions: {
      ssl: true
    },
    ssl: {
      require: true
    },
    pool: {
      max: 3,
      min: 1,
      idle: 10000
    },
  },
  test: {
    username: "mdinkktignawzx",
    password: "b0c828ea0b0a8c07265c7b943e461cf0beee78813535ea3cfa2911d64222db13",
    database: "dldf7nvrgm5ga",
    host: "ec2-18-206-84-251.compute-1.amazonaws.com",
    dialect: "postgres",
    protocol: 'postgres',
    port: 5432,
    logging: true,
    pool: {
      max: 100
    },
    sslmode: require,
    ssl: true
  },
  production: {
    username: "mdinkktignawzx",
    password: "b0c828ea0b0a8c07265c7b943e461cf0beee78813535ea3cfa2911d64222db13",
    database: "dldf7nvrgm5ga",
    host: "ec2-18-206-84-251.compute-1.amazonaws.com",
    dialect: "postgres",
    protocol: 'postgres',
    port: 5432,
    logging: true,
    pool: {
      max: 100
    },
    sslmode: require,
    ssl: true
  }
};
