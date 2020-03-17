import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';

const LeaderBoard = props => {
  let history = useHistory()
  const viewBracket = (e) =>{
    e.preventDefault();
    const target = e.target.id;
    history.push(`/brackets/${target}`)
  }
  return(
    <div className = 'leaderboard'>
      <div>
        <h1>LeaderBoard</h1>
      </div>
      <div>
        <table className = 'leaderTable'>
          <tr>
            <th style = {{width:'50%'}}>Name</th>
            <th>Score</th>
            <th>Champion</th>
          </tr>
          {props.userList.map((name,i)=>{
            return(
              <tr key = {i}>
                <td><a href = '#' id = {name.userName} onClick = {viewBracket}>{name.userName.replace(/_/g, ' ')}</a></td>
                <td>{name.score}</td>
                <td>{name.champion}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}
const mapStateToProps = state =>({
  userList: state.userList,
})

export default connect (mapStateToProps)(LeaderBoard);
