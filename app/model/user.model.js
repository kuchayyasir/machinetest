module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
	  fullname: {
		type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING,
		unique:true
	  },
	  password: {
		  type: Sequelize.STRING
		},
		profile_pic: {
		  type: Sequelize.STRING
	  }
	});
	
	return User;
}