const mongoose = require('mongoose');

const taskmanagerschema = new mongoose.Schema
(
    {
        title:{
            type: String,
        },
        description:{
            type: String,
        },
        duedate:{
            type: String,
        },
        category:{
            type: String,
        },
        username : {
            type: String,
        },
        email : {
            type: String,
        },
        password : {
            type: String,
        }
    }
)

const taskmanagermodel = mongoose.model('taskmanager-detail',taskmanagerschema);

module.exports = {taskmanagermodel};