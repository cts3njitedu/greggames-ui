import Ember from 'ember';
import SpadeConstants from '../../../../utils/spade-constants';
export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),
    value: null,

    isSocket: false,


    init() {

        //that.get("getGames")(that);

        //this._getGames();

        //this.get("spadeService").getInitialGames(ths);
        //this.get("spadeService").makeSubscriber(this);

        var self = this;

        //this.subscribe();



    },
    sample: Ember.computed("spadeService.newGameId", function () {

        console.log("I like sports");
        return this.get("spadeService.newGameId");
    }),
    subscribe() {
        let self = this;


    },
    beforeModel(){

        if(this.get("isSocket")){
            this.set("isSocket",false);
            this.transitionTo("greggames.cards.spades.games.game",this.get("spadeService.gameState.newGameId"))
        }


    },
    model(params) {

        //console.log(params.gameId);
        var self = this;
        this.get("spadeService").makeSubscriber().then(function (response) {

            //self.set("spadeService.gameState.games",response);
           
            console.log("This is strange");
            var resp = JSON.parse(response);
            self.set("spadeService.gameState.newGameId", resp.gameId);

            self.refresh();

        });

        return this.get("spadeService").getInitialGames().then(function (response) {
     
            self.set("spadeService.gameState.games", response);

            //self.set("spadeService.gameState.newGameId",self.get("spadeService.gameState.newGameId"));

            return self.get("spadeService.gameState");
        });
        // console.log(this.get("spadeService.gameState"));
        // console.log(this.get("sample"));
        // return this.get("spadeService.gameState");

    },
    actions: {

        addGame(newGame) {

            //console.log(newGame);

            this.get("spadeService").addGame(newGame);





        },
        playGame(gameId) {


            console.log(gameId);

            this.transitionTo("greggames.cards.spades.games.game", gameId);
        },
        createNewGame(newGame) {

            let self = this;
            console.log(self.get("spadeService"));
            this.set("isSocket",true);
            newGame["gameNotification"]=SpadeConstants.GAME_STATES.CREATE;
            console.log(newGame);
            this.get("spadeService").addGame(newGame);

            //console.log("Please Help me");
            // console.log(this.get("sample"));
        }
    }
});
