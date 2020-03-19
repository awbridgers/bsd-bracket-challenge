import React from 'react';
import './App.css';
import LeaderBoard from './components/leaderboard.js.jsx'
import { useHistory, Link } from 'react-router-dom'

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
        <Link className = 'link' to = {'/key'}>
          <h3>Results</h3>
        </Link>
      <LeaderBoard/>
    </div>
  )
}
export default App;
