import { combineReducers } from 'redux';
import { userList } from './userList.js'
import { dataLoaded } from './dataLoaded.js'

const rootReducer = combineReducers({
  userList,
  dataLoaded

})

export default rootReducer;
