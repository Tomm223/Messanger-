import React, { useState, useRef, useEffect } from 'react'
import Messager from './components/Messager';
import Modal from './components/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { userChange } from './store/actions/actionUser';
import { alertOpen, chatAdd, chatPull } from './store/actions/actionChat';
import Alert from './components/UI/Alert';
let ws
function isOpen(ws) { return ws.readyState === ws.OPEN }

function App() {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(true)
  const [form, setForm] = useState()
  const user = useSelector(state => state.user)
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    if (form) {
      ws = new WebSocket("ws://127.0.0.1:5000");
      ws.onopen = () => {
        if (isOpen(ws)) {
          ws.send(JSON.stringify(form))
        }
      }
      ws.onmessage = (message) => {
        const msg = JSON.parse(message.data)
        console.log(msg);
        switch (msg.method) {
          case 'connected':
            setModal(false)
            dispatch(userChange(msg.user))
            dispatch(chatPull(msg.message))
            break
          case 'pull-messages':
            dispatch(chatPull(msg.message.messages))
            break
          case 'new-message':
            dispatch(chatAdd(msg.message))
            break
          case 'alert':
            dispatch(alertOpen(msg.message))
        }
      }

    }
  }, [form])


  const send = (message) => {

    const obj = JSON.stringify({
      name: user.name, message, method: 'chat-message'
    })
    isOpen(ws) ? ws.send(obj) : console.log('WS CLOSE');

  }

  return (
    <div className="App">
      <Alert />
      <Modal onSubmit={(values) => setForm(values)} modal={modal} />
      <Messager onSubmit={send} />
    </div>
  );
}

export default App;
