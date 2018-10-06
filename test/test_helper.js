const mongoose = require('mongoose');


before(() =>{

	mongoose.connect('mongodb://localhost/users_test',{useNewUrlParser : true});
	mongoose.connection
		.once('open', () =>{done();})
		.on('error',(err) => {
			console.warn('Warning: ', err);
		});
});




beforeEach((done) =>{
	mongoose.connection.collections.users.drop(() =>{
		done();
	});
});

