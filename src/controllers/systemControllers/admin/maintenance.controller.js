const connection = require('../../../database')

controller = {}

controller.renderMaintenance = async (req, res) => {
    const { id } = req.params
    const maintenance = await connection.query(`select * from computer_maintenance where fk_computer = ${id}`)
    res.render('system/admin/admin.maintenance.hbs', {
        maintenance
    })
}

module.exports = controller