import { mergeStyles } from "react-select"

export function isOpen(ws) { return ws.readyState === ws.OPEN }


export function buildBodyChat(msg) {
   const obj = JSON.stringify({
      name: msg.username, message: msg.message, method: 'chat-message'
   })
   return obj
}
export function buildBodyLS(msg) {
   const obj = JSON.stringify({
      message: { name: msg.username, message: msg.message }, user: 'здесь пишеться свой id',
      person: 'здесь id того акк с чем хочеться общатбся'
   })
   return obj
}