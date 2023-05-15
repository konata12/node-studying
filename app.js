const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

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
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// post request
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
});

// get single blog request
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err)
        })
})

// delete response handler
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
})

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about')
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});