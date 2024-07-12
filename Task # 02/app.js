const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./dbConfig');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to create a new blog post
app.post('/posts', (req, res) => {
    const { title, content, user_id } = req.body;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = 'INSERT INTO blog_posts (title, content, created_at, user_id) VALUES (?, ?, ?, ?)';
    connection.query(sql, [title, content, createdAt, user_id], (error, results, fields) => {
        if (error) {
            console.error('Error creating new post: ' + error.stack);
            return res.status(500).json({ error: 'Failed to create new post' });
        }
        res.status(201).json({ message: 'Post created successfully', post_id: results.insertId });
    });
});

// Route to get all blog posts
app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM blog_posts';
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error retrieving blog posts: ' + error.stack);
            return res.status(500).json({ error: 'Failed to retrieve blog posts' });
        }
        res.status(200).json(results);
    });
});

// Route to get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const sql = 'SELECT * FROM blog_posts WHERE post_id = ?';
    connection.query(sql, [postId], (error, results, fields) => {
        if (error) {
            console.error('Error retrieving post: ' + error.stack);
            return res.status(500).json({ error: 'Failed to retrieve post' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Route to update a blog post by ID
app.put('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = 'UPDATE blog_posts SET title = ?, content = ?, updated_at = ? WHERE post_id = ?';
    connection.query(sql, [title, content, updatedAt, postId], (error, results, fields) => {
        if (error) {
            console.error('Error updating post: ' + error.stack);
            return res.status(500).json({ error: 'Failed to update post' });
        }
        res.status(200).json({ message: 'Post updated successfully' });
    });
});

// Route to delete a blog post by ID
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;

    const sql = 'DELETE FROM blog_posts WHERE post_id = ?';
    connection.query(sql, [postId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting post: ' + error.stack);
            return res.status(500).json({ error: 'Failed to delete post' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    });
});

// Route to create a new comment on a post
app.post('/comments', (req, res) => {
    const { content, user_id, post_id } = req.body;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = 'INSERT INTO comments (content, created_at, user_id, post_id) VALUES (?, ?, ?, ?)';
    connection.query(sql, [content, createdAt, user_id, post_id], (error, results, fields) => {
        if (error) {
            console.error('Error creating new comment: ' + error.stack);
            return res.status(500).json({ error: 'Failed to create new comment' });
        }
        res.status(201).json({ message: 'Comment created successfully', comment_id: results.insertId });
    });
});

// Route to get all comments for a post
app.get('/comments/:post_id', (req, res) => {
    const postId = req.params.post_id;
    const sql = 'SELECT * FROM comments WHERE post_id = ?';
    connection.query(sql, [postId], (error, results, fields) => {
        if (error) {
            console.error('Error retrieving comments: ' + error.stack);
            return res.status(500).json({ error: 'Failed to retrieve comments' });
        }
        res.status(200).json(results);
    });
});

// Route to delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const commentId = req.params.id;

    const sql = 'DELETE FROM comments WHERE comment_id = ?';
    connection.query(sql, [commentId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting comment: ' + error.stack);
            return res.status(500).json({ error: 'Failed to delete comment' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
