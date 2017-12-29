import Ember from 'ember';

export default Ember.Component.extend({

    
    displayError: Ember.computed("player.error",function(){
        

        return this.get("player.error");


    }),

    didRender(){

        // this._super();
        this.displayErrorTimer();

    },

    displayErrorTimer: function(){

        let self = this;
        setTimeout(function(){
            
            self.set("player.error",false);

        },3000)

    },

    errors: Ember.computed("player.errorMessages",function(){

        let errorMessages = this.get("player.errorMessages");
        let displayedError = [];
        for(var em in errorMessages){

            displayedError.push(errorMessages[em]);
        }
        return displayedError;
    })
});
