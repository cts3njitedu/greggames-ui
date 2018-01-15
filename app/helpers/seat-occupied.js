import Ember from 'ember';

export function seatOccupied(params/*, hash*/) {

  let className = "occupiedSeatInd";
  if(params[0].userId!=null){

    return className +  " occupiedColor";
  }
  return className;
}

export default Ember.Helper.helper(seatOccupied);
