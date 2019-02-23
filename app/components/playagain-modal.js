import Ember from 'ember';

export default Ember.Component.extend({

    init(){
        this._super(...arguments);

    },
    actions :{

        createPlayerView(player){

            console.log("Playing Again Friend");
            console.log(player);
            this.set("player.playAgain",false);
            this.sendAction("createPlayerView",player);
        }

    }
});
