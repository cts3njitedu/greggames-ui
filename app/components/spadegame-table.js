import Ember from 'ember';

export default Ember.Component.extend({

    init(){

        this._super();
        console.log("This is spade table");
        console.log(this.get("playerName"));
    },

    action: {

        createPlayerView(playerId){

            this.sendAction("createPlayerView",playerId);
        }

    }
});
