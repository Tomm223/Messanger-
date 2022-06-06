import { useReducer, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'


const Chat = () => {
   const user = useSelector(state => state.user)
   const list = useSelector(state => state.chat.list)

   const itemEnd = useRef(null)

   useEffect(() => {
      setTimeout(() => {
         itemEnd.current?.scrollIntoView({
            //behavior: 'smooth'
         })
      }, 300)
      itemEnd.current?.scrollIntoView({
         behavior: 'smooth'
      })
   }, [list])


   return (
      <div className={styles.block}>

         <div className={styles.chat}>

            {list.map((item, i) => {

               return (
                  <div ref={i + 1 === list.length ? itemEnd : null}
                     className={item.name === user.name ? styles.messageR : styles.message} key={item.id}>
                     <div className={styles.messageHead}>
                        <div className={styles.img}>
                           <p>{item.name[0] ? item.name[0].toUpperCase() : ''}</p>
                        </div>
                        <p className={styles.name}>{item.name}</p>
                     </div>
                     <div className={styles.msg}>
                        <p> {item.message}</p>
                     </div>
                  </div>

               )
            })}
         </div>
      </div>
   )
}

export default Chat

/*
  <div className={styles.backImg}>
               {//<img className={styles.backImgItem} src="/img/море.jpg" alt="" />
               }
               <div className={styles.backImgGradient}></div>
            </div>

*/