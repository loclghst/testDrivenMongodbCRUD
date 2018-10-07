const assert = require('assert');
const User = require('../src/users');

describe('Delete an User', () =>{
	let joe;
	beforeEach((done) =>{
		joe = new User({name: 'joe'});
		joe.save()
		   .then(() =>{
				done();
			});
	});

	it('Model Instance remove()', (done) =>{
		joe.remove()
		   .then(() => User.findOne({name: 'joe'}))
		   .then((user) =>{
		   	assert(user === null);
		   	done();
		   });
	});

	it('Class Instance remove()', (done) =>{
		//Remove a bunch of instances with he given criteria
		User.remove({name: 'joe'})
		    .then(() => User.findOne({name: 'joe'}))
		    .then((user) =>{
		    	assert(user === null);
		    	done();
		    });
	});

	it('Class method findOneAndRemove' , (done) =>{
		User.findOneAndRemove({name: 'joe'})
			.then(() => User.findOne({name: 'joe'}))
			.then((user) =>{
				assert(user === null);
				done();
			});
	});

	it('Class method findByIdAndRemove', (done) =>{
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({name:'joe'}))
			.then((user) =>{
				assert(user === null);
				done();
			});
	});
});