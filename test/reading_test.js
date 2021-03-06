const assert = require('assert');
const User = require('../src/users');

describe('Retrieve Users from the database' , () =>{
	let joe;

	beforeEach((done) =>{
		joe = new User({name: 'joe'});
		
		joe.save()
		   .then(() => done());	

	});

	it('Find all users where name is "joe"',(done) =>{
		User.find({name: 'joe'})
			.then((users) =>{
				assert(users[0]._id.toString() === joe._id.toString());

				done();
			});
		});

	it('Find an user with a particular id', (done) =>{
		User.findOne({ _id: joe._id})
			.then((user) =>{
				assert(user.name === 'joe');
				done();
			});
	});
});