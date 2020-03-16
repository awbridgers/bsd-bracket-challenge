import React, {Component} from 'react';
import {connect} from 'react-redux';
import {teamArray, results} from '../teamList.js'
import firebase from 'firebase/app';
import 'firebase/database';

export class Bracket extends Component{
  constructor(){
    super();
    this.state = {
      resultsArray: results.slice(),
      bracketName: '',
      success: false,
    }
    this.spacerArray = []
    for(let i = 0; i<63; i++){
      this.spacerArray.push('')
    }
    this.ref = firebase.database().ref('/Users');
  }
  componentDidMount(){

  }
  submit = () => {
    const blank = this.state.resultsArray.filter(x=>x.name === '');
    //first check to see if the name is empty
    if(this.state.bracketName === ''){
      alert('Please enter a name for your bracket.')
    }
    else if(blank.length > 0){
      alert('Your bracket is incomplete.')
    }
    else{
      //check to see if the name already exists
      const filterArray = this.props.userList.filter(x=>x.userName === this.state.bracketName);
      if(filterArray.length > 0){
        alert('That name is taken, please choose another.')
      }
      else{
        //submit here
        this.ref.child(`/${this.state.bracketName}`).update({
          userName: this.state.bracketName,
          score: 0,
          champion: this.state.resultsArray[62].name,
          bracket: this.state.resultsArray,
        },(error)=>{
          if(error){
            alert('There was an error saving your bracket. Please try again.')
          }
          else{
            this.setState({success: true})
          }
        })
      }
    }
  }
  cleanArray = (array, index, team) =>{
    let cleanArray = array.slice()
    for(let i=index; i < cleanArray.length; i++){
      if(cleanArray[i].name === team.name){
        cleanArray[i] = {name: '', seed: ''}
      }
    }
    return cleanArray
  }
  selectTeam = (e, round) =>{
    let updateStateArray = this.state.resultsArray.slice();
    const i = (round === 'round1') ? parseInt(e.currentTarget.id,10) :
      parseInt(e.currentTarget.id.substring(4),10)

    if(round === 'round1'){
      const target = Math.floor(i/2)
      //store previous winner
      let previous = updateStateArray[target];
      //update winner
      updateStateArray[target] = teamArray[i];
      this.setState({resultsArray: this.cleanArray(updateStateArray, target, previous )})
    }
    else{
      const target = Math.floor(i/2)+32;
      let previous = updateStateArray[target];
      updateStateArray[target] = updateStateArray[i]
      this.setState({resultsArray: this.cleanArray(updateStateArray, target, previous )})
    }

  }
  handleChange = e =>{
    this.setState({bracketName: e.target.value})
  }
  render(){
   const  { resultsArray, bracketName, success } = this.state;
    return(
      <div className = 'bracket'>
        {success &&
        <div className = 'confirm'>
          <div><h1>Your bracket has been submitted!</h1></div>
          <div><button onClick = {this.props.finish}>Continue</button></div>
        </div>}
        <div className = 'info'>
          <form>
            <input type = 'text' onChange = {this.handleChange} value = {bracketName} placeholder = 'Bracket Name'/>
            <div className = 'submit'>
              <button onClick = {this.submit}>Submit Bracket</button>
            </div>
          </form>
        </div>
        <div className = 'sixtyFour'>
          {this.spacerArray.slice(0,32).map((x,i)=>{
            const team = teamArray[i];
            return(
              <div className = 'pod'>
                <div className = 'border'></div>
                <div id = {i} className = 'team' onClick = {(e)=>this.selectTeam(e,'round1')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'thirtyTwo'>
          {this.spacerArray.slice(0,16).map((x,i)=>{
            const team = resultsArray[i]
            return(
              <div className = 'pod2'>
                <div className = 'border2'></div>
                <div id = {`game${i}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'round2')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'sweet16'>
          {this.spacerArray.slice(0,8).map((x,i)=>{
            const iterator = i+32;
            const team = resultsArray[iterator];
            return(
              <div className = 'pod3'>
                <div className = 'border3'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e,'sweet16')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'elite8'>
          {this.spacerArray.slice(0,4).map((x,i)=>{
            const iterator = i+48;
            const team = resultsArray[iterator]
            return(
              <div className = 'pod4'>
                <div className = 'border4'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'elite8')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'final4'>
          {this.spacerArray.slice(0,2).map((x,i)=>{
            const iterator = i+56;
            const team = resultsArray[iterator];
            return(
              <div className = 'pod5'>
                <div className = 'border5'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'final4')}>
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
            <div id = {`game${60}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'finals')}>
              <div className = 'seed'>{resultsArray[60].seed}</div>
              <div className = 'name'>{resultsArray[60].name}</div>
            </div>
          </div>
        </div>
        <div className = 'champion'>
          <div className = 'pod7'>
            <div className = 'border7'></div>
            <div id = {`game${62}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'champ')}>
              <div className = 'seed'>{resultsArray[62].seed}</div>
              <div className = 'name'>{resultsArray[62].name}</div>
            </div>
          </div>
        </div>
        <div className = 'finals'>
          <div className = 'pod6 right6'>
            <div className = 'border6'></div>
            <div id = {`game${61}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'finals')}>
              <div className = 'seed'>{resultsArray[61].seed}</div>
              <div className = 'name'>{resultsArray[61].name}</div>
            </div>
          </div>
        </div>
        <div className = 'final4'>
          {this.spacerArray.slice(0,2).map((x,i)=>{
            const iterator = i+58;
            const team = resultsArray[iterator];
            return(
              <div className = 'pod5'>
                <div className = 'border5 rightBorder'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'final4')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'elite8'>
          {this.spacerArray.slice(0,4).map((x,i)=>{
            const iterator = i+52;
            const team = resultsArray[iterator];
            return(
              <div className = 'pod4'>
                <div className = 'border4 rightBorder'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'elite8')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className = 'sweet16'>
          {this.spacerArray.slice(0,8).map((x,i)=>{
            const iterator = i+40;
            const team = resultsArray[iterator];
            return(
              <div className = 'pod3'>
                <div className = 'border3 rightBorder'></div>
                <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e, 'sweet16')}>
                  <div className = 'seed'>{team.seed}</div>
                  <div className = 'name'>{team.name}</div>
                </div>
              </div>
            )
          })}
      </div>
      <div className = 'thirtyTwo'>
        {this.spacerArray.slice(0,16).map((x,i)=>{
          const iterator = i+16;
          const team = resultsArray[iterator];
          return(
            <div className = 'pod2'>
              <div className = 'border2 rightBorder'></div>
              <div id = {`game${iterator}`} className = 'team' onClick = {(e)=>this.selectTeam(e,'round2')}>
                <div className = 'seed'>{team.seed}</div>
                <div className = 'name'>{team.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className = 'sixtyFour'>
        {this.spacerArray.slice(0,32).map((x,i)=>{
          const iterator = i+32
          const team = teamArray[iterator];
          return(
            <div className = 'pod'>
              <div className = 'border rightBorder'></div>
              <div id = {iterator} className = 'team alignRight' onClick = {(e)=>this.selectTeam(e, 'round1')}>
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
}
const mapStateToProps = state =>({
  userList: state.userList
})

export default connect(mapStateToProps)(Bracket)
