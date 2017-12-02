import Ember from 'ember';

export default Ember.Route.extend({

    cardService: Ember.inject.service("card-service"),
    init() {

        this.get("cardService").getInitialGames(this);

    },
    
    model() {

        return this.get("cardService.games");
    }
});
