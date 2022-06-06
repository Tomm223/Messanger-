import { ALERT_CLOSE, ALERT_OPEN, CHAT_ADD, CHAT_PULL } from "../reducers/chatReducer";

export function chatPull(list) {
   return {
      type: CHAT_PULL,
      payload: list
   }
}
export function chatAdd(item) {
   return {
      type: CHAT_ADD,
      payload: item
   }
}

export function alertOpen(text) {
   return async (d) => {
      d({
         type: ALERT_OPEN,
         payload: text
      })

      setTimeout(() => {
         d({
            type: ALERT_CLOSE
         })
      }, 3000)
   }
}
export function alertClose() {
   return {
      type: ALERT_CLOSE
   }
}

