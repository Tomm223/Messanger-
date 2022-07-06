import { aWss } from "./index.js"
import fs, { existsSync, readFileSync, writeFile } from 'fs'
import path from "path"

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
   fs.writeFile(file, JSON.stringify(resp), err => {
      if (err) {
         console.log('MyError: ', err);
      }
   })
}
export const getDataFile = (filename) => {
   //const file = existsSync('chat') && readFileSync(path('data', filename), 'utf-8');
   //let data = file ? JSON.parse(file) : [];
   const file = JSON.parse(readFileSync(path.resolve('data', filename)))
   return file
}