const usercontrol = require('../Controller/usercontroller');

module.exports = (app) => {
    app.post('/signup',usercontrol.signup);
    app.post('/login',usercontrol.login);
};