const passport = require('passport')

const controller = {}

controller.renderSignin = (req, res) => {
    res.render('auth/signin')
}

controller.signIn = passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
})

controller.logOut = (req, res, next) => {
    req.logOut()
    res.redirect('/signin')
}

module.exports = controller