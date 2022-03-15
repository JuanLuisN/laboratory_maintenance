const connection = require('../../../database')

controller = {}

controller.renderLaboratories = async (req, res) => {
    const laboratories = await connection.query('select * from laboratory')
    res.render('system/admin/admin.laboratories.hbs', {
        laboratories
    })
}

controller.addLaboratory = async (req, res) => {
    const location = req.body
    try {
        await connection.query('insert into laboratory set ?', [location])
        req.flash('success_msg', 'Laboratory added successfully')
        res.redirect('/laboratories')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again.')
        res.redirect('/laboratories')
    }
}

module.exports = controller