var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var cors=require('cors');
var path=require('path');

var app=express();

//route
const route=require('./routes/route');

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/mongodb");


//mongodb connection successfull
mongoose.connection.on('connected',()=>{   
    console.log("mongodb connected successfully");
});

//mongodb connection error
mongoose.connection.on('error',(error)=>{
    console.log('Error in mongodb connection:'+error);
});

//port number
const port=4000;

//cors & body-parser
app.use(cors());
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//use route
app.use('/api',route);


app.get('/',(req,res)=>{
    res.send('Hello Tania...Welcome to express...!!');
});


//listen to port
app.listen(port,()=>{
    console.log('Server started at port'+port);
});