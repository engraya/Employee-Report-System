const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = new express();


const dbURL = 'mongodb://localhost:27017/IssueTrackerDatabase'


mongoose.set('strictQuery', true);
mongoose.connect(dbURL, { family : 4}, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));



// MiddleWARES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Issue Model
let Issue = require('./models/issue');



// Fecth all issues in HomePge
app.get('/', (request, response) => {
    Issue.find()
        .then((result) => {
            context = { issues: result }
            response.render('home', context)
        })
        .catch((error) => {
            console.log(error)
        })
})


app.get('/issues/create', (request, response) => {
    response.render('createissue')
})

// Post an Issue from a form
app.post('/issues/create', (request, response) => {
    let issue = new Issue(request.body);
    issue.save()
        .then((result) => {
            response.redirect('/')
        })
        .catch((error) => {
            console.log(error)
        })
})

// get Single issue by ID
app.get('/issues/:id', (request, response) => {
    const id = request.params.id;
    Issue.findById(id)
        .then((result) => {
            context = {issue : result}
            response.render('issueDetail', context)

        })
        .catch((error) => console.log(error))
})


// Load thr Update fORM
app.get('/issues/update/:id', (request, response) => {
    const id = request.params.id;
    Issue.findById(id)
        .then((result) => {
            context = {issue : result}
            response.render('updateissue', context)

        })
        .catch((error) => console.log(error))
})

// make an update for a single issue
app.post('/issues/update/:id', (request, response) => {
    const id = request.params.id;
    Issue.findByIdAndUpdate(id, request.body)
        .then((result) => {
            response.redirect('/')
        })
        .catch((error) => console.log(error))
})


app.delete('/issues/:id', (request, response) => {
    const id = request.params.id;
    Issue.findByIdAndDelete(id)
        .then((result) => {
            response.json({ redirect : '/'})
        })
        .catch((error) => {
            console.log(error)
        })
})


const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is Listening on Port ${serverPort}........`)
} )