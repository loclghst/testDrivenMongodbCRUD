const assert = require('assert');
const User = require('../src/users');

describe('Retrieve users from the database to use skip and limit' ,() =>{
	let joe, maria,alex,zach;

	beforeEach((done) =>{
		joe = new User({name: 'joe'});
		maria = new User({name: 'maria'});
		zach = new User({name: 'zach'});
		alex = new User({name: 'alex'});

		Promise.all([joe.save(), maria.save(), zach.save(),alex.save()])
			   .then(() => done());
	});

	it('can skip and limit results' ,(done) =>{
		User.find({})
			.sort({name: 1})
			.skip(1)
			.limit(2)
			.then((users) =>{
				assert(users.length === 2);
				assert(users[0].name = 'joe');
				assert(users[1].name = 'maria');
				done();
			});
	});
});