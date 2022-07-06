//grphql
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema.js'
//express
import express from 'express'
const app = express()
import expressWs from 'express-ws'
const WSServer = expressWs(app)
export const aWss = WSServer.getWss()
import cors from 'cors'
//assets
import { connection } from './connection.js'
import { messager } from './messager.js'
import { mutationUsers } from './mutationUsers.js'
import { root } from './graphqlRoot.js'

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connection.connectionHandler(ws, msg)
                break
            case "create":
                mutationUsers.createUserHandler(ws, msg)
                break
            case "chat-message":
                messager.chatMessageHandler(ws, msg)
                break
        }
    })
})



app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))


app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

//app.use('/')