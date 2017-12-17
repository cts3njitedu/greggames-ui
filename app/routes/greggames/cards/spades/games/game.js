import Ember from 'ember';

export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),

    model(params) {

        var self = this;
        return this.get("spadeService").getGame(params.gameId).then(function (game) {
            console.log("Single game");
            console.log(game);
            self.set("spadeService.gameView", game);
            //self.refresh();
            return self.get("spadeService.gameView")

        })
    }
});
