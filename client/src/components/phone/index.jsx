import React, { useRef, useState, useEffect } from "react";
import Chat from "../Chat";
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import Header from "../Header";

const Phone = ({ onSubmit }) => {
   const user = useSelector(state => state.user)
   const list = useSelector(state => state.chat.list)
   const [onBtn, setOnBtn] = useState(false)
   const chatEl = useRef();
   function handle(e) {
      e.preventDefault()
      const msg = { message: chatEl.current.value, username: user.name }
      onSubmit(msg)
      e.target.message.value = ''
   }


   return (
      <div className={styles.block}>
         <Header />
         <div style={{ color: 'white', height: '50px', display: 'flex', alignItems: 'center' }}>{'<-'} <span style={{ opacity: "0" }}> _______________</span> ЧАТ </div>
         <Chat chatList={list} />
         <form onSubmit={handle} className={styles.form}>
            <input ref={chatEl} onChange={value => value.target.value.trim().length ? setOnBtn(true) : setOnBtn(false)} type="text" name="message" className={styles.msg} placeholder='Введите сообщение' />
            <button disabled={!onBtn} className={styles.btn} type='submit'>
               <img src="/img/send128.png" alt="" />
            </button>
         </form>
      </div>
   )
}

export default Phone