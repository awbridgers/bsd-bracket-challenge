import React from 'react';
import './App.css';
import LeaderBoard from './components/leaderboard.js.jsx'
import Create from './components/create.js';
import { useHistory } from 'react-router-dom'

const App = props =>{
  const history = useHistory();
  const createBracket = ()=>{
    history.push('/create')
}
  return(
    <div className = 'App'>
      <h1>2020 Bracket Challenge</h1>
      <button onClick = {createBracket}
        className = 'createButton'>Create Bracket</button>
      <LeaderBoard/>
    </div>
  )
}
export default App;
