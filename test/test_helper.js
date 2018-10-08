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
	//mongoose normalizes the collection name to lower case so blogPosts collection becomes blogposts
	const {users, comments, blogposts } = mongoose.connection.collections;

	users.drop(() =>{
		comments.drop(() =>{
			blogposts.drop(()=>{
				drop();
			});
		});
	});
});

