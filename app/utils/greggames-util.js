import Ember from 'ember';
export default Ember.Object.extend({


    isObjectEmpty(obj){
      if(obj==null){
        return true;
      }
      for(let x in obj){
        return false;
      }
      return true;

    }


});
