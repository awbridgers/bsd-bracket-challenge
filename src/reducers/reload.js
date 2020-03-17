export const reload = (state = true, action) =>{
  switch(action.type){
    case 'CHANGE_RELOAD':
      return action.bool;
    default:
      return state;
  }
}
