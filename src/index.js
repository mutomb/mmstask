import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase';
import firebase from './config/fbConfig'

const store = createStore(rootReducer, 
  compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase})),
      reduxFirestore(firebase, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true})
  )
  );
//react-redux-firebase config
  const rffProps = {
    firebase, 
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
  }


  function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) {
      return(
            <span className="spin"></span>
      )
    }else {
      return children
    }
        
  }

  ReactDOM.render(
      <Provider store={store}>
          <ReactReduxFirebaseProvider {...rffProps}>
            <AuthIsLoaded>
              <App />
            </AuthIsLoaded>  
          </ReactReduxFirebaseProvider>
      </Provider>, 
  document.getElementById('root'));