import Ember from 'ember';

export default Ember.Route.extend({



    actions: {

        spadeGames() {

            this.transitionTo("greggames.cards.spades.games")
        }
    }
});
