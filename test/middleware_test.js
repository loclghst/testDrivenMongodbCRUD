const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

describe('pre remove middleware test' ,() =>{
	let joe, blogPost;

	beforeEach((done) =>{
		joe = new User({name:' joe'});
		blogPost = new BlogPost({
			title: 'JS is great!!',
			content:'Yeah you are right!'
		});

		joe.blogPosts.push(blogPost);

		Promise.all([joe.save(), blogPost.save()])
			   .then(() => done());
	});

	it('Remove dangling blogPosts on User removal' ,(done) =>{
		joe.remove()
		   .then(() =>BlogPost.count())
		   .then((count) =>{
		   		assert(count === 0);
		   		done();
		   });
	});
});

