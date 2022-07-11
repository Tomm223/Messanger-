import { aWss } from "./index.js"
import fs, { existsSync, readFileSync, writeFile } from 'fs'
import path from "path"
import { v4 } from "uuid"
import bcrypt from 'bcrypt'

export const broadcastConnection = (ws, msg) => {
   aWss.clients.forEach(client => {
      client.send(JSON.stringify(msg))
   })

}
export const broadcastConnectionLS = (ws, msg) => {
   aWss.clients.forEach(client => {
      client.send(JSON.stringify(msg))
   })
}

export const saveIn = (file, resp) => {
   fs.writeFile(path.resolve('data', file), JSON.stringify(resp), err => {
      if (err) {
         console.log('MyError: ', err);
      }
   })
}
export const saveInAdd = (file, resp) => {
   const list = getDataFile(file)
   const newList = [...list, resp]
   saveIn(file, newList)
}
export const saveInRemove = (file, resp) => {
   const list = getDataFile(file)
   const newList = list.filter(i => i != resp)
   saveIn(file, newList)
}
export const saveInUpDate = (file, removeItem, addItem) => {
   const list = getDataFile(file)
   const prewList = list.filter(i => i != removeItem)
   saveIn(file, [...prewList, addItem])
}
export const getDataFile = (filename) => {
   const file = JSON.parse(readFileSync(path.resolve('data', filename)))
   return file
}

export const buildUserServer = async ({ email, name, password }) => {
   const id = v4()
   const pass = await bcrypt.hash(password, 3)
   const user = {
      email, name, password: pass, id, letter: name[0].toUpperCase()
   }
   return user
}
export class UserDto {
   id;
   name;
   letter;
   email;

   constructor(user) {
      this.id = user.id
      this.name = user.name
      this.letter = user.letter
      this.email = user.email
   }
}