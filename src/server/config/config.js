module.exports = {
    development: {
        username: "root",
        password: null,
        database: "todos",
        host: "127.0.0.1",
        dialect: 'mysql',
      },
    test: {
      dialect: "sqlite",
      storage: ":memory:"
    },
    production: {
      username: "root",
      password: null,
      database: "todos_prod",
      host: "127.0.0.1",
      dialect: 'mysql',
    }
  };