import { useSelector } from 'react-redux'

const Alert = () => {
   const alert = useSelector(state => state.chat.alert)
   if (!alert) {
      return <></>
   }
   return (
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%,0%)', minWidth: '80%', maxWidth: '100%', }}>
         <div class="alert alert-success" role="alert">
            {alert}
         </div>
      </div>
   )
}

export default Alert