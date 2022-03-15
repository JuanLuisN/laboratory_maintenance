const express = require('express')
const router = express.Router()

const authController = require('../../controllers/auth/auth.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/signin', authMiddleware.isNotLoggedIn, authController.renderSignin)
router.get('/logout', authMiddleware.isLoggedIn, authController.logOut)

router.post('/signin', authController.signIn)

module.exports = router