export const userList = (state = [], action) =>{
  switch(action.type){
    case 'UPDATE_USER_ARRAY':
      return action.array;
    default:
      return state
  }
}
