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