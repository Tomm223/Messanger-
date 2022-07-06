import fs, { existsSync, readFileSync, writeFile } from 'fs'
import { connection } from "./connection.js";
import { getDataFile, saveIn } from "./assets.js";

export class mutationUsers {
   static createUserHandler = async (ws, msg) => {
      try {
         const users = getDataFile('users')
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

         connection.connectionResolve(ws, messages, newuser)
      }
      catch (e) {
         ws.send(`Произошла ошибка при регистрации: ${e}`)
      }

   }
}
