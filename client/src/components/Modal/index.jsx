import React from "react";
import styles from './index.module.scss'
import Select from 'react-select'

const options = [
   { value: 'connection', label: 'Вход' },
   { value: 'create', label: 'Регистрация' }
]

const Modal = ({ onSubmit, modal }) => {

   function handler(e) {
      e.preventDefault();
      const name = e.target.name.value
      const password = e.target.password.value
      const select = e.target.select.value
      onSubmit({ name, password, method: select })
   }
   if (!modal) {
      return <></>
   }

   return (
      <div className={styles.back}>
         <div className={styles.modal}>
            <form onSubmit={handler} action="" className={styles.form}>
               <div className={styles.select}>
                  <Select name="select" placeholder="" aria-label="select" options={options}
                     defaultValue={
                        options.filter(option =>
                           option.label === 'Вход')
                     }
                     onChange={(value) => options.filter(item => item.label === value.label)}

                  />
               </div>
               <input type="text" className={styles.input} name='name' placeholder="Имя" />
               <input type="text" className={styles.input} name='password' placeholder="Пароль" />
               <button className={styles.btn}>Отправить</button>
            </form>
         </div>
      </div>
   )
}
export default Modal