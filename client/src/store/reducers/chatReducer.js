
const initState = {
   list: [],
   limit: 'all',
   alert: null
}

export const CHAT_PULL = "CHAT/PULL"
export const CHAT_ADD = "CHAT/ADD"
export const CHAT_REMOVE = "CHAT/REMOVE"
export const ALERT_OPEN = "ALERT/OPEN"
export const ALERT_CLOSE = "ALERT/CLOSE"

export function chatReducer(state = initState, action) {
   switch (action.type) {
      case CHAT_PULL:
         return { ...state, list: action.payload }
      case CHAT_ADD:
         return { ...state, list: [...state.list, action.payload] }
      case ALERT_OPEN:
         return { ...state, alert: action.payload }
      case ALERT_CLOSE:
         return { ...state, alert: null }
      default:
         return { ...state }
   }
}