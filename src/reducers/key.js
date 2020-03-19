export const key = (state = [], action)=>{
  switch(action.type){
    case 'CHANGE_KEY':
      return action.key
    default:
      return state
  }
}
