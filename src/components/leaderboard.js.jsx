import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const LeaderBoard = props => {
  return(
    <div className = 'leaderboard'>
      <div>
        <h1>Leaderboard</h1>
      </div>
      <div>
        <table className = 'leaderTable'>
            <tbody>
              <tr>
                <th style = {{width:'50%'}}>Name</th>
                <th>Score</th>
                <th>Champion</th>
            </tr>
            {props.userList.map((name,i)=>{
              return(
                <tr key = {i}>
                  <td><Link to = {`/brackets/${name.userName}`}>{name.userName.replace(/_/g, ' ')}</Link></td>
                  <td>{name.score}</td>
                  <td>{name.champion}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
const mapStateToProps = state =>({
  userList: state.userList,
})

export default connect (mapStateToProps)(LeaderBoard);
