const db = require('../config/db.config.js');
const env = require('../config/env.js');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('joi');
const User = db.users;

// Post a User
exports.create = (req, res) => {
	const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);	
	// Save to MySQL database
	User.create({ fullname: req.body.fullname, email: req.body.email, password: req.body.password,profile_pic: req.body.profile_pic  }
		).then(User => {		
		// Send created User to client
		const jwttoken = jwt.sign({ id: User.id }, env.SECRET_KEY, {
			expiresIn: env.TOKEN_EXPIRES_IN
	});
	console.log(jwttoken);
	var UserData= _.pick(User, ['fullname', 'email', 'profile_pic']);
	_.merge(UserData,{'token':jwttoken})
	console.log(UserData);
const UserObject={	status:true,
message:'Registration completed sucessfully',
data:UserData
}

		res.status(200).send(UserObject);
	});
};
 
// FETCH all Users
exports.findAll = (req, res) => {
	User.findAll().then(Users => {
	  // Send all Users to Client
	  res.send(Users);
	});
};

// Find a User by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userid).then(User => {
		res.send(User);
	})
};
 
// Update a User
exports.update = (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);	
	const id = req.params.userid;
	User.update( { fullname: req.body.fullname, email: req.body.email, password: req.body.password,profile_pic: req.body.profile_pic  }, 
					 { where: {id: req.params.userid} }
				   ).then(() => {
					 res.status(200).send("updated successfully a User with id = " + id);
				   });
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.UserId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a User with id = ' + id);
	});
};
exports.generate = (req, res) => {
	const { error } = validateEmail(req.body);
    if (error) return res.status(400).send(error.details[0].message);	
	User.findAll({
	  where: { email: req.body.email }
	}).then((User) => {
		if (_.isEmpty(User)) return res.status(400).send('Email not found');
		const jwttoken = jwt.sign({ id: User.id }, env.SECRET_KEY, {
			expiresIn: env.TOKEN_EXPIRES_IN
	});
const UserObject={	status:true,
message:'Token generated sucessfully',
data:{'token':jwttoken}
}
		res.status(200).send(UserObject);
	});
};
function validateUser(user) {
	const schema = {
			fullname: Joi.string().min(5).required(),
			email: Joi.string().min(5).max(50).required().email(),
			password: Joi.string().min(5).max(8).required(),
			profile_pic:Joi.string(),
	};
	return Joi.validate(user, schema);
}
function validateEmail(emailId) {
	const schema = {
			email: Joi.string().min(5).max(50).required().email(),
	};
	return Joi.validate(emailId, schema);
}