import Ember from 'ember';

export function idFormatter(params/*, hash*/) {


  return params[0]+"_"+params[1];
}

export default Ember.Helper.helper(idFormatter);
