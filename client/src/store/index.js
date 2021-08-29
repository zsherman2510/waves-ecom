import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers/index';
const ReduxStore = () => {
    //how to connect redux ? this sum weird shit
    // find about compose and how to connect redux
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    

       
    const store = createStore(
        appReducers,
      ////////////////////////////////
      //thunk is used for asynchronous functions but havent seen how yet...
      //you need applyMiddleware to use thunk
      ////////////////////////////////
      composeEnhancers(applyMiddleware(thunk))
    );
    
    return store;
    
}
export default ReduxStore;