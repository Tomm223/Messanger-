import React, { useRef, useState, useEffect } from "react";
import Chat from "../Chat";
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import Header from "../Header";
const Messager = ({ onSubmit }) => {
   const list = useSelector(state => state.chat.list)
   const [onBtn, setOnBtn] = useState(false)
   const chatEl = useRef();
   function handle(e) {
      e.preventDefault()

      onSubmit(chatEl.current.value)
      e.target.message.value = ''
   }

   useEffect(() => {
      console.log(onBtn);
   }, [onBtn])
   return (
      <div className={styles.block}>
         <Header />
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

export default Messager