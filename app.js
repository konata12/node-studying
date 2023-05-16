const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://dima:maxloh14@nodestuduing.blgrmfb.mongodb.net/nodeStudying?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // listen for requests
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register a view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('645e28ccdbddd61487c7b2b1')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// })

const negr = []

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    res.render('about', { title: 'ABOUT' })
});

// blog routes
app.use('/blogs', blogRoutes);

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about')
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});