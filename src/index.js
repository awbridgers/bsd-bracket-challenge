import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import { Provider, connect } from 'react-redux'
import store from './store.js'
import { updateUserArray, updateDataLoaded, changeReload, changeKey } from './actions/index.js';
import Create from './components/create.js'
import Viewer from './components/viewer.js'
//import {results} from './teamList.js'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_FIREBASE_USERNAME, process.env.REACT_APP_FIREBASE_PASS);
//firebase.auth().onAuthStateChanged((user)=>console.log(user))
//firebase.database().ref('/Key').set({results: results})




const Routing = (props) =>{
  const {reload, updateUserArray, updateDataLoaded, changeReload, changeKey} = props;
  const [loggedIn, setLoggedIn] = useState(null)
  const gradeBracket = (bracket, key) =>{
    const newBracket = bracket.map((game,i)=>{
      if(key[i].name === ''){
        return game
      }
      if(game.name !== key[i].name){
        return {
          ...game, correct: 'incorrect'
        }
      }
      else{
        return game
      }
    })
    return newBracket;
  }
  const calculateScore = (bracket, key) =>{
    let score = 0;
    bracket.forEach((game,i)=>{
      //if the user got it correct
      if(game.name === key[i].name){
        if(i<32){
          score += 10
        }
        else if(i>=32 && i<48){
          score += 20
        }
        else if(i>=48 && i<56){
          score += 30
        }
        else if(i>=56 && i<60){
          score += 40
        }
        else if(i>=60 && i<62){
          score += 50
        }
        else if(i === 62){
          score+= 60;
        }
      }
    })
    return score;
  }
  useEffect(()=>{
    return firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setLoggedIn(true)
      }
      else{
        setLoggedIn(false)
      }
    })
  }, [])
  useEffect(()=>{
    if(reload && loggedIn){
      let tempArray = [];
      let bracketKey = [];
      firebase.database().ref('/Key').once('value').then((key)=>{
        bracketKey = key.val().results;
        //console.log(bracketKey)
        changeKey(bracketKey)
      }).then(()=>{
        firebase.database().ref('/Users').once('value').then((snapshot)=>{
          snapshot.forEach((user)=>{
            let {userName, champion, bracket} = user.val();
            //correct the spelling for Louisville because I'm dumb
            bracket.forEach((game)=>{
              if(game.name === 'Louisvile'){
                game.name = 'Louisville';
              }
            })
            tempArray.push({
              userName,
              score: calculateScore(bracket, bracketKey),
              champion,
              bracket: gradeBracket(bracket, bracketKey)
            })
          })
          tempArray.sort((a,b)=>b.score - a.score)
          updateUserArray(tempArray);
          updateDataLoaded(true);
          changeReload(false);
        })
      })
    }
  },[reload,updateUserArray, updateDataLoaded, changeReload, changeKey, loggedIn])
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
          <Route path = '/key'>
            <Viewer keyBracket/>
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
  changeReload: (bool) =>dispatch(changeReload(bool)),
  changeKey: (key)=> dispatch(changeKey(key))
})
const mapStateToProps = state =>({
  reload: state.reload
})
const ConnectedRouter = connect(mapStateToProps, mapDispatchToProps)(Routing);

const BracketChallenge = () =>(
  <Provider store = {store}>
    <ConnectedRouter />
  </Provider>
)

ReactDOM.render(<BracketChallenge />, document.getElementById('root'));


serviceWorker.unregister();
