
const initState = {
   name: null,
   id: null

}

export const USER_PULL = "USER/PULL"
export const USER_RESET = "USER/RESET"

export function userReducer(state = initState, action) {

   switch (action.type) {
      case USER_PULL:
         return { ...state, name: action.payload.name, id: action.payload.id }
      case USER_RESET:
         return { ...state, user: null, id: null }
      default:
         return { ...state }
   }
}