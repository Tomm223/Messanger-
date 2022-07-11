import fs, { existsSync, readFileSync, writeFile } from 'fs'
import { broadcastConnection, getDataFile } from "./utils.js";

export class connection {
   static connectionHandler = (ws, msg) => {
      const users = getDataFile('users')
      const user = users.find((item) => item.name === msg.name && item.password === msg.password) || null
      user ? this.connectionResolve(ws, msg, user) : this.connectionFalsy(ws, msg)
   }

   static connectionResolve = (ws, msg, user) => {
      const messages = getDataFile('chat')
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

   static connectionFalsy = (ws, msg) => {
      const resp = JSON.stringify({
         method: 'alert',
         message: 'Такого пользователя не существует, проверьте введенные данные или зарегестрируйтесь'
      })
      ws.send(resp)
   }

}