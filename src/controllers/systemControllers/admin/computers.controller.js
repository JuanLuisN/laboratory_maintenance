const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')

controller = {}

controller.renderComputers = async (req, res) => {
    const { id } = req.params
    const computers = await connection.query(
        `select * from computer c, computer_perhipheals cp, computer_components cc where c.fk_laboratory = ${id} and cc.fk_computer_c = c.id and cp.fk_computer_p = c.id`)
    res.render('system/admin/admin.computers.hbs', {
        computers, idLaboratory: id
    })
}

controller.addComputer = async (req, res) => {
    const { id } = req.params
    const { serial_number, brand, network_type, status } = req.body
    const { display, keyboard, mouse, sound } = req.body
    const { ram_memory, motherboard, cpu, gpu, psu, storage } = req.body
    const { fixes } = req.body

    const newComputer = {
        fk_laboratory: id,
        serial_number, brand, network_type, status
    }
    const validateSerialNumber = await helpers.serialNumberExists(serial_number)
    try {
        if (validateSerialNumber) {
            req.flash('error_msg', 'Existing serial number')
            res.redirect(`/computers=${id}`)
        } else {
            await connection.query('insert into computer set ?', [newComputer])
            const computer = await connection.query(`select id from computer where serial_number = ${serial_number}`)
            const perhipheals = {
                fk_computer_p: computer[0].id,
                display, keyboard, mouse, sound
            }
            const components = {
                fk_computer_c: computer[0].id,
                ram_memory, motherboard, cpu, gpu, psu, storage
            }
            const firstMaintenance = {
                fk_computer: computer[0].id,
                fixes
            }
            await connection.query('insert into computer_perhipheals set ?', [perhipheals])
            await connection.query('insert into computer_components set ?', [components])
            await connection.query('insert into computer_maintenance set ?', [firstMaintenance])
            req.flash('success_msg', 'Computer added successfully')
            res.redirect(`/computers=${id}`)
        }
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect(`/computers=${id}`)
    }
}

controller.editComputer = async (req, res) => {
    const { id, lab } = req.params
    const { serial_number, brand, network_type, status } = req.body
    const { display, keyboard, mouse, sound } = req.body
    const { ram_memory, motherboard, cpu, gpu, psu, storage } = req.body

    const newComputer = {
        serial_number, brand, network_type, status
    }
    const validateSerialNumber = await helpers.serialNumberExists(serial_number)
    const numberExists = await connection.query('select serial_number from computer where id = ?', [id])
    try {
        if (numberExists[0].serial_number == serial_number) {
            await connection.query('update computer set ? where id = ?', [newComputer, id])
            const computer = await connection.query(`select id from computer where serial_number = ${serial_number}`)
            const perhipheals = {
                fk_computer_p: computer[0].id,
                display, keyboard, mouse, sound
            }
            const components = {
                fk_computer_c: computer[0].id,
                ram_memory, motherboard, cpu, gpu, psu, storage
            }
            await connection.query('update computer_perhipheals set ? where fk_computer_p = ?', [perhipheals, computer[0].id])
            await connection.query('update computer_components set ? where fk_computer_c = ?', [components, computer[0].id])
            req.flash('success_msg', 'Computer edited successfully')
            res.redirect(`/computers=${lab}`)
        } else {
            if (validateSerialNumber) {
                req.flash('error_msg', 'Existing serial number')
                res.redirect(`/computers=${lab}`)
            } else {
                await connection.query('update computer set ? where id = ?', [newComputer])
                const computer = await connection.query(`select id from computer where serial_number = ${serial_number}`)
                const perhipheals = {
                    fk_computer_p: computer[0].id,
                    display, keyboard, mouse, sound
                }
                const components = {
                    fk_computer_c: computer[0].id,
                    ram_memory, motherboard, cpu, gpu, psu, storage
                }
                await connection.query('update computer_perhipheals set ? where fk_computer_p = ?', [perhipheals, computer[0].id])
                await connection.query('update computer_components set ? where fk_computer_c = ?', [components, computer[0].id])
                req.flash('success_msg', 'Computer edited successfully')
                res.redirect(`/computers=${lab}`)
            }
        }
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect(`/computers=${lab}`)
    }
}

controller.deleteComputer = async (req, res) => {
    const { id, lab } = req.params
    try {
        await connection.query('delete from computer where id = ?', [id])
        req.flash('success_msg', 'Computer removed successfully')
        res.redirect(`/computers=${lab}`)
    } catch (e) {
        console.log(e)
        req.flash('error_msg', 'Something went wrong, try again')
        res.redirect(`/computers=${lab}`)
    }
}

module.exports = controller