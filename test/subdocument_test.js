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

	it('Can add post to an existing User', (done) =>{
		const joe = new User({
			name: 'joe',
			posts: []
		});

		joe.save()
		   .then(() => User.findOne({name:'joe'}))
		   .then((user) =>{
		   		user.posts.push({title: 'New Post'});
		   		return user.save();
		   })
		   .then(() => User.findOne({name:'joe'}))
		   .then((user) =>{
		   		assert(user.posts[0].title === 'New Post');
		   		done();
		   });
	});

	it('Can remove an already existing sub document' ,(done) =>{
		const joe = new User({
			name: 'joe',
			posts : [{title : 'New title'}]
		});

		joe.save()
		   .then(() => User.findOne({name: 'joe'}))
		   .then((user) => {
		   		const post = user.posts[0];
		   		// NOTE: When we use .remove on a model instance, we dont need to save it
		   		// but when we are removing a subdocument from a model instance we need to save it to persist the changes in a db
		   		post.remove();
		   		return user.save();
		   })
		   .then(() => User.findOne({name: 'joe'}))
		   .then((user) =>{
		   		assert(user.posts.length ===0 );
		   		done();
		   });
	});

});