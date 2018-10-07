const assert = require('assert');
const User = require('../src/users');

describe('virtual type test' ,() =>{
	it('postCount returns the number of posts' ,(done)=>{
		const joe = new User({
			name:'joe',
			posts: [{title : 'New Post'}]
		});

		joe.save()
		   .then(() => User.findOne({name:'joe'}))
		   .then((user) => {
		   		assert(user.postCount === 1);
		   		done();
		   });
	});
});
