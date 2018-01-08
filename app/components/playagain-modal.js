import Ember from 'ember';

export default Ember.Component.extend({

    actions :{

        createPlayerView(player){

            console.log("Playing Again Friend");
            console.log(player);
            this.sendAction("createPlayerView",player);
        }

    }
});
