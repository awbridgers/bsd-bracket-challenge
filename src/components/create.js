import React from 'react'
import { connect } from 'react-redux';
import Bracket from './bracketGame.js'
import {useHistory} from 'react-router-dom'
import {changeReload} from '../actions/index.js'


const Create = props =>{
  const history = useHistory();
  const finish = () =>{
    props.changeReload(true)
    history.push('/')
  }
  return(
    <div className = 'create'>
      <div className = 'banner'><h1>Create your Bracket</h1></div>
        <Bracket finish = {finish}/>
    </div>
  )
}
const mapDispatchToProps = dispatch =>({
  changeReload: (bool)=>dispatch(changeReload(bool)),

})
export default connect(null, mapDispatchToProps)(Create);
