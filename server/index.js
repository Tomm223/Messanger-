import express from 'express'
const app = express()
import expressWs from 'express-ws'
const WSServer = expressWs(app)
const aWss = WSServer.getWss()
import cors from 'cors'
const PORT = process.env.PORT || 5000
import fs, { existsSync, readFileSync, writeFile } from 'fs'
import { v4 } from 'uuid'
const uuid = v4
import path from 'path'
//message
const chat = existsSync('chat') && readFileSync('chat', 'utf-8');
let messages = chat ? JSON.parse(chat) : [];
//users
const userslist = existsSync('users') && readFileSync('users', 'utf-8');
let users = userslist ? JSON.parse(userslist) : [];

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        console.log(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "create":
                createUserHandler(ws, msg)
                break
            case "chat-message":
                chatMessageHandler(ws, msg)
                break
        }
    })
})


app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))


const connectionHandler = (ws, msg) => {
    const user = users.find((item) => item.name === msg.name && item.password === msg.password) || null
    console.log(user);
    user ? connectionResolve(ws, msg, user) : connectionFalsy(ws, msg)
}

const connectionResolve = (ws, msg, user) => {
    const msgs = JSON.stringify({
        method: 'connected',
        message: messages, user
    })
    ws.send(msgs)
    broadcastConnection(ws, {
        method: 'alert',
        message: `Подключился пользователь ${msg.name}`
    })
}

const connectionFalsy = (ws, msg) => {
    const resp = JSON.stringify({
        method: 'alert',
        message: 'Такого пользователя не существует, проверьте введенные данные или зарегестрируйтесь'
    })
    ws.send(resp)
}

const createUserHandler = async (ws, msg) => {
    try {
        const id = uuid()
        const newuser = {
            id,
            name: msg.name,
            password: msg.password,
            letter: msg.name[0].toUpperCase()
        }

        const oldList = JSON.parse(JSON.stringify(users))
        const newList = [...oldList, newuser]
        saveIn('users', newList)
        users = newList

        connectionResolve(ws, messages, newuser)
    }
    catch (e) {
        ws.send(`Произошла ошибка при регистрации: ${e}`)
    }

}


const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        client.send(JSON.stringify(msg))
    })
}

const chatMessageHandler = (ws, msg) => {
    const id = uuid()
    msg = { message: msg.message, name: msg.name, id }
    const oldList = JSON.parse(JSON.stringify(messages))
    const newList = [...oldList, msg]
    messages = newList
    saveIn('chat', newList)
    broadcastConnection(ws, { method: 'new-message', message: msg })
}

const saveIn = (file, resp) => {
    fs.writeFile(file, JSON.stringify(resp), err => {
        if (err) {
            console.log('MyError: ', err);
        }
    })
}