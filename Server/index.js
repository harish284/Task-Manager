const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {taskmanagermodel} = require('./schema');
const {LoginModel} = require('../Server/Model/usermodel');
require('dotenv').config()


const app = express();
app.use(bodyParser.json());
app.use(cors());


//connect to mongodb
async function connecttodb(){
    try{
        const url = process.env.MONGODB_URL
        await mongoose.connect(url);

        console.log('connected to database successfully');
        
    }
    catch(error){
        console.log("cannot connect to database");
        console.log(error)
    }
}
connecttodb();

const port = 3000; ;
app.listen(port,() => {
    console.log(`server started at ${port}....`);
})


//CREATE 
app.post('/taskmanagercreate', async function (req, res) {
    try {
        const { title, description, duedate, category, userId } = req.body;
        if (!title || !duedate || !category || !userId) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }
        const newTask = new taskmanagermodel({
            title,
            description,
            duedate,
            category,
            user: userId
        });
        await newTask.save();
        res.status(200).json({ status: "success", message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot create task", error: error.message });
    }
});

//READ
app.get('/taskmanagerget/:userId',async function(req,res){
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
app.delete('/taskmanagerdelete/:id',async function(req,res){
    const taskId = req.params.id;
    try{
         await taskmanagermodel.findByIdAndDelete(taskId);
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
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).send({ message: 'All fields are required' });
    }
    if(password.length < 6){
        return res.status(400).send({ message: 'Password must be at least 6 characters' });
    }
    LoginModel.findOne({ $or: [{ name: name }, { email: email }] })
    .then(existingUser => {
      if (existingUser) {
        if (existingUser.email === email) {
          res.status(400).json({ message: "Email already exists" }); 
        } else {
          res.status(400).json({ message: "Username already exists" });
        }
      } else {
        LoginModel.create({ name, email, password })
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
        const user = await LoginModel.findOne
        ({ email,password });   
        if (user) {
            res.status(200).json({ 
                id: user._id, 
                name: user.name, 
                email: user.email,
                message: "User logged in successfully"
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
