import { json } from 'express';
import fs, { existsSync, readFileSync, writeFile } from 'fs'
import { v4 } from 'uuid';
import { getDataFile, saveIn } from './assets.js';


export const root = {
   getAllUsers: () => {
      const users = getDataFile('users')
      return users
   },
   getUserById: ({ id }) => {
      const users = getDataFile('users')
      return users.find(user => user.id === id)
   },
   createUser: ({ msg }) => {
      let users = getDataFile('users')
      const id = v4()
      const newuser = {
         id,
         ...msg,
         letter: msg.name[0].toUpperCase()
      }
      const oldList = JSON.parse(JSON.stringify(users))
      const newList = [...oldList, newuser]
      saveIn('users', newList)
      users = newList
      return msg
   },
   createMessage: ({ message }) => {
      const id = v4()
      const msg = { message: message.message, name: message.name, id }
      //const messages = getDataFile('chat')
      //const newList = [messages, msg]
      //saveIn('chat', newList)
      //broadcastConnection(ws, { method: 'new-message', message: msg })
      return msg
   },
   getMessagesLimit: ({ limit }) => {
      const messages = getDataFile('chat')
      if (limit > messages.length) {
         return messages
      }
      const myMsg = messages.slice(-limit)
      return myMsg
   }
}
