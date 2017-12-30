import Ember from 'ember';

export function comparator(params/*, hash*/) {

  let a = params[0];
  let b = params[1];
  return params[0]==params[1];
}

export default Ember.Helper.helper(comparator);
