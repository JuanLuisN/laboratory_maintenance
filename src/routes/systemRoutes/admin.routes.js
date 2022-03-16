const express = require('express')
const router = express.Router()

const laboratoriesController = require('../../controllers/systemControllers/admin/laboratories.controller')
const usersController = require('../../controllers/systemControllers/admin/users.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/laboratories', authMiddleware.isAdmin, laboratoriesController.renderLaboratories)
router.post('/laboratories/add', authMiddleware.isAdmin, laboratoriesController.addLaboratory)
router.post('/laboratories/edit/:id', authMiddleware.isAdmin, laboratoriesController.editLaboratory)
router.get('/laboratories/delete/:id', authMiddleware.isAdmin, laboratoriesController.deleteLaboratory)

router.get('/users', authMiddleware.isAdmin, usersController.renderUsers)
router.post('/users/add', authMiddleware.isAdmin, usersController.addUser)
router.post('/users/edit/:id', authMiddleware.isAdmin, usersController.editUser)
router.get('/users/delete/:id', authMiddleware.isAdmin, usersController.deleteUser)

module.exports = router