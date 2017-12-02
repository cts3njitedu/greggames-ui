import Ember from 'ember';

export function toLower(params/*, hash*/) {

  let value = params[0];

  if(!Ember.isEmpty(value)){

    return value.toLowerCase();
  }

  return "";
}

export default Ember.Helper.helper(toLower);
