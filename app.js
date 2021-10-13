/* Importing Modules */

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');

const {mongoDbUrl, PORT, globalVariables} = require('./config/configuration');

const flash = require('connect-flash');

const session = require('express-session');


const app = express();

/* Configure Mongoose */

// mongoose.connect('mongodb://msadmin:6XmESY5@172.17.0.3:27017/mscms', {
mongoose.connect(mongoDbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(response => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('Database connection failed');
    console.log(err);
});


/* Configure Express */

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


/* Flash and session */
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true,
}));

app.use(flash());

app.use(globalVariables);


/* Setup view engine */
// app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.engine("handlebars", hbs({defaultLayout: 'default', runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true},}));
app.set('view engine', 'handlebars');


/* Routes */
const defaultRoutes = require('./routes/defaultroutes');
const adminRoutes = require('./routes/adminroutes');
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});