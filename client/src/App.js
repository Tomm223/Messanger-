import React, { useState, useRef, useEffect } from 'react'
import Modal from './components/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { userChange } from './store/actions/actionUser';
import { alertOpen, chatAdd, chatPull } from './store/actions/actionChat';
import Alert from './components/UI/Alert';
import { isOpen, buildBodyChat, buildBodyLS } from './assets'
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER_BY_ID } from './query/user';
import { GET_MESSAGES_LIMIT } from './query/message';
import Phone from './components/phone';

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS)  //(GET_USER_BY_ID, { variables: { id: "c9f8948f-81b0-404d-b488-fb0fe415fd46" } })
  useEffect(() => {
    if (!loading) {
      console.log("GET__USERS", data.getAllUsers);
    }
  }, [data])
  let limit = 200
  const { data: messagesLimit, loading: isLoadingMsgLimit, error: errorMsgLimit } = useQuery(GET_MESSAGES_LIMIT, { variables: { limit: limit } })

  useEffect(() => {
    if (!isLoadingMsgLimit) {
      console.log('GET_MSG_LIMIT', messagesLimit);
    }
  }, [messagesLimit])

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState()
  const user = useSelector(state => state.user)
  const [chatList, setChatList] = useState([])
  const ws = useRef()
  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:5000");
    if (form) {
      ws.current.onopen = () => {
        if (isOpen(ws.current)) {
          ws.current.send(JSON.stringify(form))
        }
      }
      ws.current.onmessage = (message) => {
        const msg = JSON.parse(message.data)
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
    isOpen(ws.current) ? ws.current.send(message) : console.log('WS CLOSE');
  }

  return (
    <div className="App">
      <Alert />
      <Modal onSubmit={(values) => setForm(values)} modal={modal} />
      <Phone onSubmit={(msg) => send(buildBodyChat(msg))} />
    </div>
  );
}

export default App;
