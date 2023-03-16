require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-sessions')

const app = express()
const PORT = process.env.PORT || 8080

//Connect to Database
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to the database'))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(session({
//     secret: "fuck you",
//     saveUninitialized: true,
//     resave: false,
// }))

// app.use((req, res, next) => {
//     res.locals.message = req.session.message
//     delete req.session.message
//     next()
// })

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("Welcome to NODE JS")
})

//Routes prefix
app.use("", require("./routes/routes"))

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`)
})