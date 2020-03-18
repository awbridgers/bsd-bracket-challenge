import { combineReducers } from 'redux';
import { userList } from './userList.js'
import { dataLoaded } from './dataLoaded.js'
import { reload } from './reload.js';
import { key } from './key.js';

const rootReducer = combineReducers({
  userList,
  dataLoaded,
  reload,
  key

})

export default rootReducer;
