const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


before((done) =>{

	mongoose.connect('mongodb://localhost/users_test',{useNewUrlParser : true});
	mongoose.connection
		.once('open', () =>{done();})
		.on('error',(err) => {
			console.warn('Warning: ', err);
		});
});



//run this before Mocha executes the tests

beforeEach((done) =>{
	mongoose.connection.collections.users.drop(() =>{
		done();
	});
});

