import Ember from 'ember';

export function divideTimeSeconds(params/*, hash*/) {
  return params/1000;
}

export default Ember.Helper.helper(divideTimeSeconds);
