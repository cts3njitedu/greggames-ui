import Ember from 'ember';

export default Ember.Component.extend({

    
    displayError: Ember.computed("player.error",function(){
        

        return this.get("player.error");


    }),

    errors: Ember.computed("player.errorMessages",function(){

        let errorMessages = this.get("player.errorMessages");
        let displayedError = [];
        for(var em in errorMessages){

            displayedError.push(errorMessages[em]);
        }
        return displayedError;
    }),
    actions: {

        closeErrorModal(){

            console.log("I like chicken");
            this.sendAction("closeErrorModal");
        }

    }
});
