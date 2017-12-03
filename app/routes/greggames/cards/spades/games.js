import Ember from 'ember';

export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),



    init() {

        //that.get("getGames")(that);

        //this._getGames();

        this.get("spadeService").getInitialGames(this);
        this.get("spadeService").makeSubscriber(this);


    },
    model(params) {

        //console.log(params.gameId);

        //this.get("getGamesSocket")(this);
        //console.log("adfsdfsadfasdf" + JSON.stringify(this.get("gameState")));
        console.log(this.get("spadeService.gameState"));
        return this.get("spadeService.gameState");

    },
    actions: {

        addGame(newGame) {

            console.log(newGame);

            this.get("spadeService").addGame(newGame);





        }
    }
});
