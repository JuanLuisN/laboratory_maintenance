const express = require('express')
const router = express.Router()

const laboratoriesController = require('../../controllers/systemControllers/admin/laboratories.controller')
const usersController = require('../../controllers/systemControllers/admin/users.controller')
const computersController = require('../../controllers/systemControllers/admin/computers.controller')
const maintenanceController = require('../../controllers/systemControllers/admin/maintenance.controller')
const ticketsController = require('../../controllers/systemControllers/admin/tickers.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/laboratories', authMiddleware.isAdmin, laboratoriesController.renderLaboratories)
router.post('/laboratories/add', authMiddleware.isAdmin, laboratoriesController.addLaboratory)
router.post('/laboratories/edit/:id', authMiddleware.isAdmin, laboratoriesController.editLaboratory)
router.get('/laboratories/delete/:id', authMiddleware.isAdmin, laboratoriesController.deleteLaboratory)

router.get('/users', authMiddleware.isAdmin, usersController.renderUsers)
router.post('/users/add', authMiddleware.isAdmin, usersController.addUser)
router.post('/users/edit/:id', authMiddleware.isAdmin, usersController.editUser)
router.get('/users/delete/:id', authMiddleware.isAdmin, usersController.deleteUser)

router.get('/computers=:id', computersController.renderComputers)
router.post('/computers=:id/add', authMiddleware.isAdmin, computersController.addComputer)
router.post('/computers/edit/:id/:lab', authMiddleware.isAdmin, computersController.editComputer)
router.get('/users/delete/:id/:lab', authMiddleware.isAdmin, computersController.deleteComputer)

router.get('/maintenance=:id', maintenanceController.renderMaintenance)

router.get('/support_tickets', ticketsController.renderTickets)
router.post('/support_tickets/add', ticketsController.addSupportTicket)
router.get('/support_tickets/delete/:id', ticketsController.deleteSupportTicket)
router.get('/support_tickets/changeStatus/:id', ticketsController.changeProcess)
router.post('/support_tickets/addM/:id', ticketsController.addMaintenance)

module.exports = router