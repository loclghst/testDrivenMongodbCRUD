const assert = require('assert');
const User = require('../src/users');

describe('Subdocument test', () =>{
	it('Can create sub documents', (done) =>{
		const joe = new User({
			name:'joe',
			posts : [{title : 'postTitle'}]
		});

		joe.save()
		   .then(() => User.findOne({name: 'joe'}))
		   .then((user) =>{
		   		assert(user.posts[0].title === 'postTitle');
		   		done();
		   });
	});
})