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
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/laboratories')
    }
}

controller.editLaboratory = async (req, res) => {
    const location = req.body
    const { id } = req.params
    try {
        await connection.query('update laboratory set ? where id = ?', [location, id])
        req.flash('success_msg', 'Laboratory edited successfully')
        res.redirect('/laboratories')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/laboratories')
    }
}

controller.deleteLaboratory = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query('delete from laboratory where id = ?', [id])
        req.flash('success_msg', 'Laboratory removed successfully')
        res.redirect('/laboratories')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/laboratories')
    }
}

module.exports = controller