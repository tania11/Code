var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var cors=require('cors');
var path=require('path');

var app=express();


const route=require('./routes/route');
const port=4000;

mongoose.connect('mongodb://127.0.0.1:27017/mongodb');

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected successfully');
});

mongoose.connection.on('error',(error)=>{
    console.log('Error in mongo db connection'+error);
});

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

app.get('/',(req,res)=>{
    res.send("Hello welcome to mean app");
});

app.listen(port,()=>{
    console.log('Server started at port'+port);
})

