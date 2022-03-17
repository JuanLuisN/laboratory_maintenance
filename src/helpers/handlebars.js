const exhbs = require('express-handlebars')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isAdmin', (rol) => {
    return rol == 1 ? true : false
})

hbs.handlebars.registerHelper('getRole', (rol) => {
    return rol == 1 ? `
    <div class="input-group my-2">
        <span class="input-group-text"><i class="fas fa-project-diagram"></i></span>
        <select name="fk_rol" class="form-select" aria-label="Default select example">
            <option>Select a role</option>
                <option value="1" selected>Admin</option>
                <option value="2">User</option>
        </select>
    </div>` : `
    <div class="input-group my-2">
        <span class="input-group-text"><i class="fas fa-project-diagram"></i></span>
        <select name="fk_rol" class="form-select" aria-label="Default select example">
            <option>Select a role</option>
                <option value="1">Admin</option>
                <option value="2" selected>User</option>
        </select>
    </div>`
})

hbs.handlebars.registerHelper('getNameRole', (rol) => {
    return rol == 1 ? 'Administrador' : 'User'
})

hbs.handlebars.registerHelper('getStatus', (status) => {
    if(status == 'Working') {
        return `
        <div class="input-group my-2">
            <span class="input-group-text"><i class="fas fa-exclamation-triangle"></i></span>
            <select name="status" class="form-select" aria-label="Default select example" required>
                <option>Select status</option>
                <option value="Working" selected>Working</option>
                <option value="In repair">In repair</option>
                <option value="In down">In down</option>
            </select>
        </div>
        `
    }
    if(status == 'In repair') {
        return `
        <div class="input-group my-2">
            <span class="input-group-text"><i class="fas fa-exclamation-triangle"></i></span>
            <select name="status" class="form-select" aria-label="Default select example" required>
                <option>Select status</option>
                <option value="Working">Working</option>
                <option value="In repair" selected>In repair</option>
                <option value="In down">In down</option>
            </select>
        </div>
        `
    }
    if(status == 'In down') {
        return `
        <div class="input-group my-2">
            <span class="input-group-text"><i class="fas fa-exclamation-triangle"></i></span>
            <select name="status" class="form-select" aria-label="Default select example" required>
                <option>Select status</option>
                <option value="Working">Working</option>
                <option value="In repair">In repair</option>
                <option value="In down" selected>In down</option>
            </select>
        </div>
        `
    }
})

hbs.handlebars.registerHelper('getNetwork', (network) => {
    return network == 'Ethernet' ? `
    <div class="input-group my-2">
        <span class="input-group-text"><i class="fas fa-network-wired"></i></span>
        <select name="network_type" class="form-select" aria-label="Default select example" required>
            <option>Select the type of network </option>
            <option value="Ethernet" selected>Ethernet</option>
            <option value="Wifi">Wifi</option>
        </select>
    </div>
    ` : `
    <div class="input-group my-2">
        <span class="input-group-text"><i class="fas fa-network-wired"></i></span>
        <select name="network_type" class="form-select" aria-label="Default select example" required>
            <option>Select the type of network </option>
            <option value="Ethernet">Ethernet</option>
            <option value="Wifi" selected>Wifi</option>
        </select>
    </div>
    `
})

hbs.handlebars.registerHelper('setDate', (date) => {
    const dateSet = date.toString()
    return dateSet.substring(4,15)
})

hbs.handlebars.registerHelper('inProcess', (status) => {
    return status == 'Process' ? true : false
})