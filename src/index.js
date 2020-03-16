import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, useParams, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import { Provider, connect } from 'react-redux'
import store from './store.js'
import { updateUserArray, updateDataLoaded } from './actions/index.js';
import Create from './components/create.js'
import Viewer from './components/viewer.js'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})



const Test = ()=>{
  let {userName} = useParams()
  return(
    <div style = {{color: '#cfb53b'}}>
      <h1>{userName}</h1>
    </div>
  )
}

const Routing = (props) =>{
  useEffect(()=>{
    let tempArray = [];
    firebase.database().ref('/Users').once('value').then((snapshot)=>{
      snapshot.forEach((user)=>{
        const {userName, score, champion, bracket, email} = user.val();
        tempArray.push({
          userName,
          score: parseInt(score,10),
          champion,
          bracket,
        })
      })
      tempArray.sort((a,b)=>b.score - a.score)
      props.updateUserArray(tempArray);
      props.updateDataLoaded(true);
    })
  },[])
  return(
    <div>
      <Router>
        <Switch>
          <Route path = '/create'>
            <Create />
          </Route>
          <Route path = '/brackets/:userName'>
            <Viewer />
          </Route>
          <Route path = '/'>
            <App />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
const mapDispatchToProps = dispatch =>({
  updateUserArray: (array)=>dispatch(updateUserArray(array)),
  updateDataLoaded: (bool)=>dispatch(updateDataLoaded(bool)),
})
const ConnectedRouter = connect(null, mapDispatchToProps)(Routing);

const BracketChallenge = () =>(
  <Provider store = {store}>
    <ConnectedRouter />
  </Provider>
)

ReactDOM.render(<BracketChallenge />, document.getElementById('root'));


serviceWorker.unregister();
