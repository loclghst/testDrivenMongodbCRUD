const assert = require('assert');
const User = require('../src/users.js');

describe('Create an user', () =>{
	it('Saves a user', () =>{
		const joe = new User({name : 'Joe'});
		joe.save();
		
	});
});