import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';

export default Ember.Route.extend({

    greggameService: Ember.inject.service("greggames-service"),
    init() {

        this.get("greggameService").getInitialGames(this);

    },
    
    model() {

        return this.get("greggameService.games");
    }
});
