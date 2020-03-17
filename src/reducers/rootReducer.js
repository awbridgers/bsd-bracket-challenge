import { combineReducers } from 'redux';
import { userList } from './userList.js'
import { dataLoaded } from './dataLoaded.js'
import { reload } from './reload.js';

const rootReducer = combineReducers({
  userList,
  dataLoaded,
  reload

})

export default rootReducer;
