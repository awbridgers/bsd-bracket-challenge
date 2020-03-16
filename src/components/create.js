import React from 'react'
import { connect } from 'react-redux';
import Bracket from './bracketGame.js'
import {useHistory} from 'react-router-dom'


const Create = props =>{
  const history = useHistory();
  const finish = () =>{
    history.push('/')
  }
  return(
    <div className = 'create'>
      <h1>Create your Bracket</h1>
        <Bracket finish = {finish}/>
    </div>
  )
}

export default connect()(Create);
