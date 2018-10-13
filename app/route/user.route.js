module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');
    const auth = require('../middleware/auth.js');
    // Create a new Users
    app.post('/api/users',upload.single('image'), users.create);

 
    // Retrieve all Users
    app.get('/api/users', users.findAll);
 
    // Retrieve a single Users by Id
    app.get('/api/users/:userid', users.findById);
 
    // Update a Users with Id
    app.put('/api/users/:userid',[auth], users.update);
 
    // Delete a Customer with Id
    app.delete('/api/users/:userid', users.delete);
    
    //Generate the token
    app.post('/api/tokengenerate', users.generate);
}