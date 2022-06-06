import { USER_PULL, USER_RESET } from "../reducers/userRedcuer";

export function userChange(user) {
   return {
      type: USER_PULL,
      payload: user
   }
}
export function userReset() {
   return {
      type: USER_RESET
   }
}