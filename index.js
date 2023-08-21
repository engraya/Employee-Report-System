if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = new express();
const login = require('./models/login');
const bcrypt = require('bcrypt');
const passport  = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');



const initializePassport = require('./passport-config');
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)



const users = []

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
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Issue Model
let Issue = require('./models/issue');
const { render } = require('ejs');
const { request } = require('http');
const { error } = require('console');



// Fecth all issues in HomePge
app.get('/', checkAuthenticated, (request, response) => {
    Issue.find()
        .then((result) => {
            context = { issues: result}
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

// Authentication

app.get('/register', checkNotAuthenticated, (request, response) => {
    response.render('register')
})

app.get('/login', checkNotAuthenticated, (request, response) => {
    response.render('login')
}) 

app.post('/register', checkNotAuthenticated, async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        users.push({
            id : Date.now().toString(),
            name : request.body.name,
            email : request.body.email,
            password : hashedPassword
        })
        response.redirect('/login')
    } catch {
        response.redirect('/register')
    }
    console.log(users)

})


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect  : '/',
    failureRedirect : '/login',
    failureFlash : true
}))

app.delete('/logout', (request, response, next) => {
    request.logOut((error) => {
        if (error) {
            return next(error)
        }
        else {
            response.redirect('/login')
        }
    })

})


function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next()
    }
    response.redirect('/login')
}

function checkNotAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return response.redirect('/')
    }
    next()
}
// app.post('/register', (request, response) => {
//     const data = {
//         username : request.body.username,
//         email : request.body.email,
//         password : request.body.password
//     }

//     login.insertMany([data])
//         .then((result) => {
//             response.redirect('/')
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// app.get('/login', async (request, response) => {
//     try {
//         const check = await login.findOne({username:request.body.username})
//         if (check.password === request.body.password) {
//             response.redirect('/')
//         }
//         else {
//             response.send("Wrong Pssword")
//         }
//     } catch {
//         response.send("Wrong Details")
//     }
// })

const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is Listening on Port ${serverPort}........`)
} )