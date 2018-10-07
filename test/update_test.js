const assert = require('assert');
const User = require('../src/users');

describe('Update test', () =>{
	let joe;

	beforeEach((done) =>{
		joe = new User({name: 'joe', postCount: 0});
		joe.save()
		   .then(() => done());

	});

	function assertName(operation, done){
		operation
			.then(() => User.find({}))
			.then((users) =>{
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	it('Model instance "set & save" ', (done) =>{
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
	});

	it('Model instance update' , (done) =>{
		//update doesn't require to be saved seperately
		assertName(joe.update({name: "Alex"}), done);
	});

	it('Model Class Update', (done) =>{
		assertName(
			User.update({name:'joe'},{name:'Alex'}),
			done);
	});

	it('Model Class findOneAndUpdate' , (done) =>{
		assertName(
			User.findOneAndUpdate({name:'joe'},{name:'Alex'}),
			done);
	});

	it('Model Class findByIdAndUpdate', (done) =>{
		assertName(
			User.findByIdAndUpdate(joe._id,{name:'Alex'}),
			done);
	});

	it('Update the postCount of all users with the given criteria by 1', (done) =>{
		
	// 	User.find({name: 'joe'})
	// 		.then((users) =>{
	// 			users.forEach((user) =>{
	// 				let pcount = user.postCount + 1;
	// 				user.set('postCount', pcount)
	// 					.save()
	// 					.then(() =>{
	// 						done();
	// 					});
	// 			});
	// 		});	


		User.update({name:'joe'}, {$inc :{postCount:1}})
			.then(() => User.findOne({name: 'joe'}))
			.then((user) =>{
				assert(user.postCount === 1);
				done();
			});
	 });

});