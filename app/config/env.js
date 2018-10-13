const env = {
  database: 'machine_test',
  username: 'yasir_kuchay',
  password: 'asdfghjkl',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  TOKEN_EXPIRES_IN:'3h',
  SECRET_KEY:'ABBJKDHFKJSHKFHSKHFKSH'
};

module.exports = env;
