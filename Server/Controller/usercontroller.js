const {LoginModel} = require('../Model/usermodel');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const mongoose = require('mongoose');

exports.signup = (req,res) => {
    const { username, email, password } = req.body;
    const db=uuid.v4();

    const newUser = new LoginModel({ 
        username,
        email,
        password : bcrypt.hashSync(password, 10)
    });
    
    LoginModel.findOne({ email }).then((data) => {
        if (data) {
            return res.status(400).send({ message: 'User already exists' });
        }else{
            newUser.save().then((data) => {
                mongoose.connection.useDb(db).createCollection(username);
                res.send({status:"success", message: 'User created successfully' });
            });
        };
        })
        .catch(err => {
        return res.status(500).send({ message: 'User creation failed' });
    });
}

// login
exports.login = async (req, res) => {
    try {
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
}