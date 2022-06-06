export class chat {
   static chatMessageHandler = (ws, msg) => {
      const id = uuid()
      msg = { message: msg.message, name: msg.name, id }
      const oldList = JSON.parse(JSON.stringify(messages))
      const newList = [...oldList, msg]
      messages = newList
      saveIn('chat', newList)
      broadcastConnection(ws, { method: 'new-message', message: msg })
   }
}

export class connection {
   static connectionHandler = (ws, msg) => {
      const user = users.find((item) => item.name === msg.name && item.password === msg.password) || null
      console.log(user);
      user ? connectionResolve(ws, msg) : connectionFalsy(ws, msg)
   }

   static connectionResolve = (ws, msg) => {
      const msgs = JSON.stringify({
         method: 'pull-messages',
         messages
      })
      ws.send(msgs)
      console.log(messages);
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

export const saveIn = (file, resp) => {
   fs.writeFile(file, JSON.stringify(resp), err => {
      if (err) {
         console.log('MyError: ', err);
      }
   })
}