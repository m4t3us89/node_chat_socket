require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views' , path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine' , 'html')
app.use(morgan('dev'))

app.get('/' , (req,res)=>{
    return res.render('index')
})

app.get('*' , (req,res)=>{
    return res.redirect('/')
})

let messages = []

io.on('connection', socket=>{
    console.log(`Socket Conectado ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage' , data=>{
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on('sendTypingMessage' , data=>{
        socket.broadcast.emit('receivedTypingMessage', data)
    })
})

server.listen(process.env.PORT || 3000)