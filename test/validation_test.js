const assert = require('assert');
const User = require('../src/users');

describe('Validating records', () =>{
	it('Requires an user name' ,() =>{
		const user = new User({name: undefined});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'User Name is required');
	});

	it('Validates if the User name is longer than 2 characters' , () =>{
		const user = new User({name: 'AL'});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'User Name must be longer than 2 characters');
	});

	it('disallow an invalid user from being saved to the db' , (done)=>{
		const user = new User({name:'Al'});
		user.save()
			.catch((validationResult) =>{
				const {message} = validationResult.errors.name;
				assert(message === 'User Name must be longer than 2 characters');
				done();
			});
	});
});