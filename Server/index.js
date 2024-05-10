const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {taskmanagermodel} = require('./schema');
const {LoginModel} = require('../Server/Model/usermodel');


const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin : '*',
}));


//connect to mongodb
async function connecttodb(){
    try{
        const url = ('mongodb+srv://vijay2304a:123@cluster0.99eceu8.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0')
        await mongoose.connect(url)
        console.log('connected to database successfully');
        const port = process.env.PORT || 3000;
        app.listen(port,function(){
            console.log('server started at 3000....');
        })
    }
    catch(error){
        console.log("cannot connect to database");
        console.log(error)
    }
}
connecttodb();


//CREATE 
app.post('/taskmanager-create',async function(req,res){
    try{
        await taskmanagermodel.create({
            "title" :req.body.title,
            "description" :req.body.description,
            "duedate" :req.body.duedate,
            "category" :req.body.category,
            user:userId 
        })
        await taskmanagermodel.save();
        res.status(200).json({status : "success" , message : "Task created successfully"});
    }
    catch(error){
        res.status(400).json({status : "failed" , message : "cannot create task"});
    }
})

//READ
app.get('/taskmanager-get/:userId',async function(req,res){
    try{
        const userId = req.params.userId;
        const taskdetails = await taskmanagermodel.find({user:userId});
        res.status(200).json(taskdetails);
    }
    catch(error){
        res.status(500).json({status : "failed" , message : "cannot get task"});
    }
})


//DELETE
app.delete('/taskmanager-delete/:id',async function(req,res){
    const taskid = req.params.id;
    try{
         await taskmanagermodel.findOne(taskid);
        res.status(200).json({status : "success" , message : "Task deleted successfully"});
    }
    catch(err){
        res.status(500).json({status : "failed" , message : "cannot delete task"});
    }
})

//USER
app.get('/getuser',async function(req,res){
    try{
      const userdata=await LoginModel.find();
      res.status(200).json(userdata);
    }
    catch(error){
      res.status(500).json({
      "status":"failure",
      "message":"couldn't fetch",
      "error": error
  })
      }
  })


//Create-Account
app.post("/signup",async (req,res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).send({ message: 'All fields are required' });
    }

    if(password.length < 6){
        return res.status(400).send({ message: 'Password must be at least 6 characters' });
    }

    LoginModel.findOne({ $or: [{ name: username }, { email: email }] })
    .then(existingUser => {
      if (existingUser) {
        if (existingUser.email === email) {
          res.status(400).json({ message: "Email already exists" }); 
        } else {
          res.status(400).json({ message: "Username already exists" });
        }
      } else {
        LoginModel.create({ username, email, password })
          .then(user => {
            res.status(201).json({ message: "User created successfully", userId: user._id });
          })
          .catch(err => res.status(500).json({ message: err.message })); 
      }
    })
    .catch(err => res.status(500).json({ message: err.message })); 
});


// login
app.post("/login",async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await LoginModel.findOne({ email,password });   
        if (user) {
            res.status(200).json({ 
                id: user._id, 
                name: user.name, 
                email: user.email
             });
          } else {
            res.status(401).json({
                 message: "Incorrect username or password" 
            });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    });
