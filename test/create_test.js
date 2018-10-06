const assert = require('assert');
const User = require('../src/users.js');

describe('Create an user', (done) =>{
	it('Saves a user', () =>{
		const joe = new User({name : 'Joe'});
		joe.save()
		   .then(() =>{
		   	//Has 'joe' been saved successfully to the db
		   	assert(!joe.isNew);
		   	done();
		   });
		
	});
});