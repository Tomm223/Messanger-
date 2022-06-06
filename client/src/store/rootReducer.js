import { combineReducers } from 'redux'
import { chatReducer } from './reducers/chatReducer'
import { userReducer } from './reducers/userRedcuer'

export const rootReducer = combineReducers({
   user: userReducer,
   chat: chatReducer
})

export default rootReducer
