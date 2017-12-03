import Ember from 'ember';

export default Ember.Component.extend({



    actions: {

        viewGame(game){
            console.log(game.toLowerCase());
            this.sendAction("viewGame",game);

        }

    }
});
