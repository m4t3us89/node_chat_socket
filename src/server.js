require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()



const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views' , path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine' , 'html')
app.use(morgan())

app.use('/' , (req,res)=>{
    res.render('index')
})

server.listen(process.env.PORT || 3000)