const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const {taskmanagermodel} = require('./schema');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to mongodb

async function connecttodb(){
    try{
        const url = 'mongodb+srv://vijay2304a:123@cluster0.99eceu8.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0'
        await mongoose.connect(url)
        console.log('connected to database successfully');
        const port = process.env.PORT || 3000;
        app.listen(port,function(){
            console.log('server started at 3000....');
        })
    }
    catch(error){
        console.log("cannot connect to database");
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
        })
        res.status(200).send('task created successfully');
    }
    catch(error){
        res.status(400).send('cannot create task');
    }
})

//READ
app.get('/taskmanager-get',async function(req,res){
    try{
        const taskdetails = await taskmanagermodel.find();
        res.status(200).send(taskdetails);
    }
    catch(error){
        res.status(500).send('cannot get task');
    }
})

//UPDATE
app.patch('/taskmanager-update/:id',async function(req,res){
    try{
        const taskmanager = await taskmanagermodel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send('task updated successfully');
    }
    catch(err){
        res.status(500).send('cannot update task');
    }
})

//DELETE
app.delete('/taskmanager-delete/:_id',async function(req,res){
    try{
        const id = req.params._id;
        const deleted = await taskmanagermodel.findByIdAndDelete(id);
        res.status(200).send('task deleted successfully');
    }
    catch(err){
        res.status(500).send('cannot delete task');
    }
})



