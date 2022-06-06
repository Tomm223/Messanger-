import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import rootRedux from './rootRedux';
import thunk from 'redux-thunk';
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer,
   composeWithDevTools(
      applyMiddleware(thunk)
   )
)
