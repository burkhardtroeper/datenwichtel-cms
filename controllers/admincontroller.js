const Post = require('../models/post.model');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: (req, res) => {
        Post.find().then(posts => {
            //posts = posts.toJSON();
            res.render('admin/posts/index', {posts: posts});
        });
    },
    submitPosts: (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        newPost.save().then(post => {
            console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/admin/posts');
        })

    },
    createPosts: (req, res) => {
        res.render('admin/posts/create');
    }

}