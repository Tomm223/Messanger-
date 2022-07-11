import fs, { existsSync, readFileSync, writeFile } from 'fs'
import { broadcastConnection, getDataFile, saveIn } from "./utils.js"
//id
import { v4 } from 'uuid'
import path from 'path';
const uuid = v4

export class messager {
   static chatMessageHandler = (ws, message) => {
      const id = uuid()
      const msg = { message: message.message, name: message.name, id }
      console.log(msg);
      switch (message.method) {
         case 'chat-message':
            this.chatMessagerSend(ws, msg)
            break
         case 'ls-message':
            this.LSMessagerSend(ws, message)
            break
      }
   }
   static chatMessagerSend = (ws, msg) => {
      const messages = getDataFile('chat')
      const newList = [messages, msg]
      saveIn('chat', newList)
      broadcastConnection(ws, { method: 'new-message', message: msg })
   }
   static LSMessagerSend = (ws, message) => {
      const usersFIle = getDataFile('users')
      let users = JSON.parse(JSON.stringify(usersFIle)) // получаем users
      const user = users.find(i => i.id === message.user) // получаем user
      const ls = user.ls.find(i => i === message.person) // получаем *<>* ls:[  *'personID'*:[{msg},{msg}] ]
      const newList = [...ls, message.message]// push newMsg
      user.ls[message.person] = newList // push personID in ls
      users = users.filter(i => i.id !== message.user) // delete olduser
      users.push(user) // push newuser
      saveIn('users', newList)
      //broadcastConnection(ws, { method: 'new-message', message: msg })
   }
}