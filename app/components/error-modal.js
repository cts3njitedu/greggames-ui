import Ember from 'ember';

export default Ember.Component.extend({

    
    displayError: Ember.computed("playerMessage.error",function(){
        

        return this.get("playerMessage.error");


    }),

    errors: Ember.computed("playerMessage.errorMessages",function(){

        let errorMessages = this.get("playerMessage.errorMessages");
        let displayedError = [];
        for(var em in errorMessages){

            displayedError.push(errorMessages[em]);
        }
        return displayedError;
    }),
    actions: {

        closeErrorModal(){
            this.set()
            this.sendAction("closeErrorModal");
        }

    }
});
