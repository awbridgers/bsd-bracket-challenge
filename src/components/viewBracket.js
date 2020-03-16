import React from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom'
import Viewer from './viewer.js'



const ViewBracket = props =>{
  
}

const mapStateToProps = state =>{
  userList: state.userList,
}

export default connect(mapStateToPropse)(ViewBracket)
