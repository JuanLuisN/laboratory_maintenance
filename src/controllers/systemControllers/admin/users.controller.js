const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')

controller = {}

controller.renderUsers = async (req, res) => {
    const users = await connection.query(`select * from users where id != ${req.user.id}`)
    res.render('system/admin/admin.users.hbs', {
        users
    })
}

controller.addUser = async (req, res) => {
    const user = req.body
    user.password = await helpers.encryptPassword(user.password)
    const validateEmail = await helpers.emailExists(user.email)
    try {
        if (validateEmail) {
            req.flash('error_msg', 'Existing email')
            res.redirect('/users')
        } else {
            await connection.query('insert into users set ?', [user])
            req.flash('success_msg', 'User added successfully')
            res.redirect('/users')
        }
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/users')
    }
}

controller.editUser = async (req, res) => {
    const user = req.body
    const { id } = req.params
    user.password = await helpers.encryptPassword(user.password)
    const emailExists = await connection.query(`select email from users where id = ${id}` )
    const validateEmail = await helpers.emailExists(user.email)
    try {
        if (emailExists[0].email == user.email){
            await connection.query('update users set ? where id = ?', [user, id])
            req.flash('success_msg', 'User edited successfully')
            res.redirect('/users')
        } else {
            if (validateEmail) {
                req.flash('error_msg', 'Existing email')
                res.redirect('/users')
            } else {
                await connection.query('update users set ? where id = ?', [user, id])
                req.flash('success_msg', 'User edited successfully')
                res.redirect('/users')
            }
        }
        
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/users')
    }
}

controller.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query('delete from users where id = ?', [id])
        req.flash('success_msg', 'User removed successfully')
        res.redirect('/users')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/users')
    }
}

module.exports = controller