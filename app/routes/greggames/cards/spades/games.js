import Ember from 'ember';

export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),



    init() {

        //that.get("getGames")(that);

        //this._getGames();

        this.get("spadeService").getInitialGames(this);
        this.get("spadeService").makeSubscriber(this);
        


    },
    sample: Ember.computed("spadeService.gameState.gameId",function(){

        console.log("I like sports");
        return this.get("spadeService.gameState.gameId");
    }),
    model(params) {

        //console.log(params.gameId);

        //this.get("getGamesSocket")(this);
        //console.log("adfsdfsadfasdf" + JSON.stringify(this.get("gameState")));
        
        console.log(this.get("spadeService.gameState"));
        console.log(this.get("sample"));
        return this.get("spadeService.gameState");

    },
    actions: {

        addGame(newGame) {

            console.log(newGame);

            this.get("spadeService").addGame(newGame);





        },
        playGame(gameId) {


            console.log(gameId);

            this.transitionTo("greggames.cards.spades.games.game", gameId);
        },
        createNewGame(newGame) {

            let self = this;
            console.log(self.get("spadeService"));
            this.get("spadeService").addGame(newGame);
            //console.log("Please Help me");
           // console.log(this.get("sample"));
        }
    }
});
