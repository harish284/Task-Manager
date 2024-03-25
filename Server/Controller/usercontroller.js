const loginmodel = require('../Model/usermodel');
const bcrypt = require('bcrypt');

exports.register = (req,res) => {
    const { username, email, password } = req.body;
    const newUser = new loginmodel({ 
        username,
        email,
        password : bcrypt.hashSync(password, 10)
    });
    loginmodel.findOne({ email }).then((data) => {
        if (data) {
            return res.status(400).send({ message: 'User already exists' });
        }else{
            newUser.save().then((data) => {
                res.status(200).send({status:"success", message: 'User created successfully' });
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
        usermodel.findOne({ email }).then((data) => {
            if (!data) {
                return res.status(404).send({ message: 'User not found' });
            }

            const validPassword = bcrypt.compareSync(password, data.password);

            if (!validPassword) {
                 res.status(401).send({ message: 'Invalid password' });
            }

            res.status(200).send({ message: 'Login successful' });
        })
        let token = jwt.sign({ id: user._id}, "your_secret_key");
        res.send({
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            },
            accessToken: token,
        })
    } catch (error) {
        res.status(500).json({ status: 'failed', message: 'Cannot login' });
    }
}