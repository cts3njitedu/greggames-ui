import Ember from 'ember';

export default Ember.Component.extend({

    showModal: false,
    isCreator: false,
    gameState: null,
    spadeService: Ember.inject.service("spade-service"),
    temp: Ember.computed('spadeService.gameState.newGameId',function(){

        console.log("checking cable");
        console.log(this.get("spadeService.newGameId"));
        return this.get("spadeService.gameState.newGameId");



    }),
    actions: {

        playGame(gameId) {

            console.log("this was called");
            this.sendAction("playGame", gameId);

        },

        createGame() {
            console.log("sugar Honey ice tea");
            console.log(this.get("showModal"));
            this.set("showModal", true);
            console.log(this.get("showModal"));
        },
        cancelGame() {

            this.set("showModal", false);
        },
        createNewGame(newGame){

            this.set("isCreator",true);
            this.sendAction("createNewGame",newGame);
           
            

        },
        routeToGame(){



        }
    }
});
