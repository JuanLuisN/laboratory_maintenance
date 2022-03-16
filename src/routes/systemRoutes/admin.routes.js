const express = require('express')
const router = express.Router()

const laboratoriesController = require('../../controllers/systemControllers/admin/laboratories.controllers')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/laboratories', authMiddleware.isAdmin, laboratoriesController.renderLaboratories)
router.post('/laboratories/add', authMiddleware.isAdmin, laboratoriesController.addLaboratory)
router.post('/laboratories/edit/:id', laboratoriesController.editLaboratory)
router.get('/laboratories/delete/:id', laboratoriesController.deleteLaboratory)

module.exports = router