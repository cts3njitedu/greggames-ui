import Ember from 'ember';

export default Ember.Component.extend({



    actions: {

        spadeGames(){
            //console.log("hey how is it going")
            this.sendAction("spadeGames");
        }

    }
});
