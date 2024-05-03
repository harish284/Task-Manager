const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {taskmanagermodel} = require('./schema');
const jwt = require('jsonwebtoken');
const {LoginModel} = require('../Server/Model/usermodel');
const bcrypt= require('bcrypt');
const {authenticateToken} = require('../Server/Middleware');


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
            title:req.body.title,
            description:req.body.description,
            duedate:req.body.duedate,
            category:req.body.category,
            userId:user._id
        })
        await taskmanagermodel.save();
        res.status(200).json({status : "success" , message : "Task created successfully"});
        console.log(userId);
    }
    catch(error){
        res.status(400).json({status : "failed" , message : "cannot create task"});
    }
})

//READ
app.get('/taskmanager-get',async function(req,res){
    try{
        const taskdetails = await taskmanagermodel.find({userId:user._id});
        res.status(200).json(taskdetails);
    }
    catch(error){
        res.status(500).json({status : "failed" , message : "cannot get task"});
    }
})

//UPDATE
app.patch('/taskmanager-update/:id',async function(req,res){
    try{
        const taskmanager = await taskmanagermodel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({status : "success" , message : "Task updated successfully"}) ;
    }
    catch(err){
        res.status(500).json({status : "failed" , message : "cannot update task"});
    }
})

//DELETE
app.delete('/taskmanager-delete/:_id',async function(req,res){
    try{
        const id = req.params._id;
        const deleted = await taskmanagermodel.findByIdAndDelete(id);
        res.status(200).json({status : "success" , message : "Task deleted successfully"});
    }
    catch(err){
        res.status(500).json({status : "failed" , message : "cannot delete task"});
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

    const isUser = LoginModel.findOne({ email:email });
    if (isUser) {
        return res.status(400).send({ message: 'User already exists' });
    }

    const newUser = new LoginModel({ 
        username,
        email,
        password : bcrypt.hashSync(password, 10)
    });
    
    await newUser.save();
    const accessToken = jwt.sign({newUser}, 
    process.env.ACCESS_TOKEN_SECRET,{expiresIn: '3600m'});
    return res.status(200).send({ message: 'User created successfully', accessToken });
});


// login
app.post("/login",async (req, res) => {
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).send({ message: 'All fields are required' });
        }
        const {email, password} = req.body;
        LoginModel.findOne({ email }).then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                 res.status(401).send({ message: 'Invalid password' });
            }
           
            let token = jwt.sign({ id: user._id}, "your_secret_key");
        res.send({message: 'Login successful',
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            accessToken: token,
        })
        })
        
    } catch (error) {
        res.status(500).json({ status: 'failed', message: 'Cannot login' });
    }
});