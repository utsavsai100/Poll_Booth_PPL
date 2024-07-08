const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const session = require("express-session");

// setting view engine
app.set('view engine', 'ejs');

// load assets
app.use('/public', express.static("public"))

dotenv.config({ path: './config.env' })
require('./db/mongoose.js')
require('./auth/jwttoken.js')
require('./auth/authMiddleware.js')

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false
}));

app.use(flash());

// setting routes
app.use(require('./router/indexRoute.js'));
app.use(require('./router/teamsRoute.js'));
app.use(require('./router/pollsRoute.js'));
app.use(require('./router/inviteRoute.js'));

// 404 page
app.get('*', (req, res) => {
    res.status(404).render('404')
})

const PORT = process.env.PORT
//Listening to port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})


/* Password hashing  */