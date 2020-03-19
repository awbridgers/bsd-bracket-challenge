import React, {useEffect, useState} from 'react';
import { teamArray, results } from '../teamList.js';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


const Viewer = props => {
  const {userName} = useParams();
  const {dataLoaded, keyBracket, gameKey, userList} = props;
  const history = useHistory();
  const [bracket, changeBracket] = useState(results.slice());
  useEffect(()=>{
    if(dataLoaded){
      if(keyBracket){
        changeBracket(results)
      }
      else{
        //check to see if the username exists
        const bracketCheck = userList.find(x=>x.userName === userName);
        if(typeof(bracketCheck)=== 'undefined'){
          //if the user does not exist, reroute to home
          alert('User does not exist');
          history.push('/')
        }
        else{
          //if the user does exist, update the bracket array
          changeBracket(bracketCheck.bracket)
        }
      }
    }
  },[dataLoaded, keyBracket, gameKey, userName, history, userList])
  const home = () =>{
    history.push('/')
  }
  return(
    <div className = 'bracket viewer'>
      <div className = 'home'><button onClick = {home}>Home</button></div>
      <div className = 'sixtyFour'>
        {teamArray.slice(0,32).map((team,i)=>{
          return(
            <div key = {i} className = 'pod'>
              <div className = 'border'></div>
              <div id = {i} className = 'team viewer' >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'thirtyTwo'>
        {bracket.slice(0,16).map((team,i)=>{
          //console.log(team)
          return(
            <div key = {i} className = 'pod2'>
              <div className = 'border2'></div>
              <div id = {`game${i}`} className = {`team viewer ${team.correct}`}>
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'sweet16'>
        {bracket.slice(32,40).map((team, iterator)=>{
          return(
            <div key = {iterator} className = 'pod3'>
              <div className = 'border3'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'elite8'>
        {bracket.slice(48,52).map((team, iterator)=>{
          return(
            <div key = {iterator} className = 'pod4'>
              <div className = 'border4'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'final4'>
        {bracket.slice(56,58).map((team,iterator)=>{
          return(
            <div key = {iterator} className = 'pod5'>
              <div className = 'border5'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'finals'>
        <div className = 'pod6'>
          <div className = 'border6'></div>
          <div id = {`game${60}`} className = {`team viewer ${bracket[60].correct}`} >
            <div className = 'seed'>{bracket[60].seed}</div>
            <div className = 'name'>{bracket[60].name}</div>
          </div>
        </div>
      </div>
      <div className = 'champion'>
        <div className = 'pod7'>
          <div className = 'border7'></div>
          <div id = {`game${62}`} className = {`team viewer ${bracket[62].correct}`}>
            <div className = 'seed'>{bracket[62].seed}</div>
            <div className = 'name'>{bracket[62].name}</div>
          </div>
        </div>
      </div>
      <div className = 'finals'>
        <div className = 'pod6 right6'>
          <div className = 'border6'></div>
          <div id = {`game${61}`} className = {`team viewer ${bracket[61].correct}`} >
            <div className = 'seed'>{bracket[61].seed}</div>
            <div className = 'name'>{bracket[61].name}</div>
          </div>
        </div>
      </div>
      <div className = 'final4'>
        {bracket.slice(58,60).map((team,iterator)=>{
          return(
            <div key = {iterator} className = 'pod5'>
              <div className = 'border5 rightBorder'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'elite8'>
        {bracket.slice(52,56).map((team,iterator)=>{
          return(
            <div key = {iterator} className = 'pod4'>
              <div className = 'border4 rightBorder'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'sweet16'>
        {bracket.slice(40,48).map((team,iterator)=>{
          return(
            <div key = {iterator} className = 'pod3'>
              <div className = 'border3 rightBorder'></div>
              <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
    </div>
    <div className = 'thirtyTwo'>
      {bracket.slice(16,32).map((team,iterator)=>{
        return(
          <div key = {iterator} className = 'pod2'>
            <div className = 'border2 rightBorder'></div>
            <div id = {`game${iterator}`} className = {`team viewer ${team.correct}`} >
              <div className = 'seed'>{team.seed}</div>
              <div className = 'name'>{team.name}</div>
            </div>
          </div>
        )
      })}
    </div>
    <div className = 'sixtyFour'>
      {teamArray.slice(32).map((team,iterator)=>{
        return(
          <div key = {iterator} className = 'pod'>
            <div className = 'border rightBorder'></div>
            <div id = {iterator} className = 'team alignRight'>
              <div className = 'name'>{team.name}</div>
              <div className = 'seedRight'>{team.seed}</div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
  )
}
const mapStateToProps = state =>({
  userList: state.userList,
  dataLoaded: state.dataLoaded,
  gameKey: state.key
})
export default connect(mapStateToProps)(Viewer)
