const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

const passport=require('passport');
require('./config/passport')(passport);
const mongoose =require('mongoose');
const config=require('./config/database');
const session = require('express-session');
const jwt=require('jwt-simple');
//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',function(){
    console.log('connected to database '+config.database)
})

//On error
mongoose.connection.on('error',function(err){
    console.log('Dtabase error:'+err)
})

const app=express();


app.set('view engine','ejs');

const users=require('./routes/users')

app.use(cors());


app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());




app.use('/users',users);

app.get('/', function(req,res){
   res.send('/users/register,authenticate,profile');
});


app.get('*',function(req,res){
   res.sendFile(path.join(__dirname,'public/index.html'));
});

port=process.env.PORT || 8080;
app.listen(port,function(){
    console.log('Port started at :8080');
});
