import Ember from 'ember';

export function seatOccupied(params/*, hash*/) {

  let className = "occupiedSeatInd";
  if(!params[0].bot){

    return className +  " occupiedColor";
  }
  return className;
}

export default Ember.Helper.helper(seatOccupied);
