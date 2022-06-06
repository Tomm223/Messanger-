import styles from './index.module.scss'

const Header = () => {
   var today = new Date();
   var time = today.getHours() + ":" + today.getMinutes() //+ ":" + today.getSeconds(); 10
   return (
      <div className={styles.block}>
         <nav className={styles.nav}>
            <div className={styles.side}>
               <div className={styles.item}>
                  <p>{time}</p>
               </div>
               <div className={styles.item}>
                  <img src="/img/clo.png" alt="" />
               </div>

            </div>
            <div className={styles.side}>
               <div className={styles.item}>
                  <img src="/img/bar.png" alt="" />
               </div>
               <div className={styles.item}>
                  <img src="/img/wifi.png" alt="" />
               </div>
               <div className={styles.item}>
                  <img src="/img/batt.png" alt="" />
               </div>
            </div>

         </nav>
      </div>
   )
}

export default Header