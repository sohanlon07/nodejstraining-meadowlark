const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')

const app = express()

app.use(express.static(__dirname + '/public'))

//configure handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

//custom 404
app.use(handlers.notFound)

//custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}; ` +
        `Press Ctrl-C to terminate.`))
} else {
    module.exports = app
}
        