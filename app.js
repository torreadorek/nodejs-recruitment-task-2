const app = require('express')()
const db = require('./models/index')
const movies = require('./routes/movies')
const bodyParser = require('body-parser')
const {errorHandler,restHandler} = require('./utils/exceptions')
require('dotenv').config({path:`${__dirname}/config/.env`})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',movies)
app.use('*',restHandler)

app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    db.sequelize.authenticate()
    .then(()=>{
        console.log('Connected to database')
    }).catch(error=>{
        console.log('Error while connecting to database:',error)
    })
    console.log(`Listening on port ${process.env.PORT}`)
}).on('error',(error)=>{
    console.log('Error on listening: ',error)
})

module.exports = app