var c = (x) => console.log(x);
const { request } = require('express');
const express = require('express');
var methodOverride = require('method-override')
const app = express();
const path = require('path');

const { v4: uuidv } = require('uuid');

// Listen to port carefully and decide the port no 
app.listen(3000, () => {
    c("Listening on port 3000");
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Our Yosho-Database
let comments = [
    {
        id: uuidv(),
        username: 'Tomorrow Meeting',
        comment: 'Have to meet one more A series client'
    },
    {
        id: uuidv(),
        username: 'Client Feedback',
        comment: 'Need to create a feedback report of the client'
    },
    {
        id: uuidv(),
        username: 'Movie',
        comment: 'Need to plan a new movie with friends'
    }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.get('/comments/submitted', (req, res) => {
    res.render('./comments/submitted');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { id, comment });
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { id, comment });
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    // c(bodi) ;
    let idx = comments.length - 1;
    let newId = comments[idx].id + 1;
    comments.push({ id: newId, username, comment });
    c(comments);
    res.redirect('comments/submitted');
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params ;
    const newComment = req.body.comment ;
    c(newComment) ;
    let oldComment = comments.find(c => c.id === id) ;
    oldComment.comment = newComment ;
    res.redirect('/comments/')
})

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params ;

    comments = comments.filter((c) => {
        return c.id !== id ;
    })
    c(comments) ; 
    res.redirect('/comments/')
})

app.get('/tacos', (req, res) => { 
    res.send("GET /tacos response")
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    // const {Helo, Bye} = req.body ;
    const bodi = req.body;
    console.log(typeof req.body);
    var ar = [];
    for (const key in bodi) {
        console.log(`${key} : ${bodi[key]}`);
        ar.push(key);
    }
    // c(req.body) ;
    res.send(`${ar}`)
})

app.get('/' , (req, res) => {
    res.redirect('/comments') ;
})

app.get('/:anything' , (req, res) => {
    res.send('Kya kar r hai bhai tu!') ; 
}) 