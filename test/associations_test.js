const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comments');

describe('Associations test', ()=>{
	let joe, blogPost, comment;
	
	beforeEach((done) =>{
		
		joe = new User({name: 'joe'});
		blogPost = new BlogPost({
			title: 'JS is great!!',
			content: 'Yeah you are right'
		});
		comment = new Comment({
			content: 'Congratulations on the great post',

		});

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		//Promise.all() to handle multiple promises at once

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			   .then(() => done());

		});

	it('saves a relation between a user and a blogPost' ,(done) =>{
		User.findOne({name: 'joe'})
			.populate('blogPosts')  //.populate() is a query modifier. Takes a property name of the collection as argument.
			.then((user) =>{
				assert(user.blogPosts[0].title === 'JS is great!!');
				done();
			});
	});

	it('saves a full relation graph', (done) =>{
		User.findOne({name:'joe'})
			.populate({
				path: 'blogPosts',
				populate:{
					path: 'comments',
					model: 'comment',
					populate:{
						path:'user',
						model:'user'
					}
				}
			})
			.then((user) =>{
				assert(user.blogPosts[0].title === 'JS is great!!');
				assert(user.blogPosts[0].content === 'Yeah you are right');
				assert(user.blogPosts[0].comments[0].content === 'Congratulations on the great post');
				assert(user.blogPosts[0].comments[0].user.name === 'joe');
				done();
			})
			
	});



});