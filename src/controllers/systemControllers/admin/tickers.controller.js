const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')

controller = {}

controller.renderTickets = async (req, res) => {
    if (req.user.fk_rol == 1) {
        const tickets = await connection.query(
            `select ${req.user.id} as idu, s.id, u.username, c.fk_laboratory, c.serial_number, l.location, s.fk_computer, s.lifting_date, s.required_fixes, s.status from support_ticket s, users u, computer c, laboratory l 
                where s.fk_user = u.id and s.fk_computer = c.id and s.status != 'Closed' and c.fk_laboratory = l.id`)
        res.render('system/admin/admin.tickets.hbs', {
            tickets
        })
    } else {
        const tickets = await connection.query(
            `select s.id, u.username, c.fk_laboratory, c.serial_number, l.location, s.fk_computer, s.lifting_date, s.required_fixes, s.status from support_ticket s, users u, computer c, laboratory l 
                where s.fk_user = u.id and s.fk_computer = c.id and s.fk_user = ${req.user.id} and c.fk_laboratory = l.id`)
        res.render('system/admin/admin.tickets.hbs', {
            tickets
        })
    }
    
}

controller.addSupportTicket = async (req, res) => {
    const supportTicket = req.body
    const serial_numberValidate = await helpers.serialNumberExists(supportTicket.serial_number)
    try {
        if(serial_numberValidate) {
            const computer = await connection.query(`select id from computer where serial_number = ${supportTicket.serial_number}`)
            const newTicket = {
                fk_user: req.user.id,
                fk_computer: computer[0].id,
                required_fixes: supportTicket.required_fixes,
                status: 'Open'
            }
            await connection.query('insert into support_ticket set ?', [newTicket])
            req.flash('success_msg', 'Support ticket added successfully')
            res.redirect('/support_tickets')
        } else {
            req.flash('error_msg', 'Serial number does not exist')
            res.redirect('/support_tickets')
        }
        
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/support_tickets')
    }
}

controller.deleteSupportTicket = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query(`delete from support_ticket where id = ${id}`)
        req.flash('success_msg', 'Support ticket removed successfully')
            res.redirect('/support_tickets')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/support_tickets')
    }
}

controller.changeProcess = async (req, res) => {
    const { id } = req.params
    try {
        await connection.query(`update support_ticket set status = 'Process' where id = ${id}`)
        req.flash('success_msg', 'Support ticket updated successfully')
        res.redirect('/support_tickets')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/support_tickets')
    }
}

controller.addMaintenance = async (req, res) => {
    const { id } = req.params
    const { fixes, id_computer } = req.body
    const newMaintenance = {
        fk_computer: id_computer,
        fixes
    }
    try {
        await connection.query('insert into computer_maintenance set ?', [newMaintenance])
        await connection.query(`update support_ticket set status = 'Closed' where id = ${id}`)
        req.flash('success_msg', 'Support ticket updated successfully')
        res.redirect('/support_tickets')
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect('/support_tickets')
    }
}

module.exports = controller