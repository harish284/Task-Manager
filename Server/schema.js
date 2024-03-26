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
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    }
)

const taskmanagermodel = mongoose.model('taskmanager-detail',taskmanagerschema);

module.exports = {taskmanagermodel};