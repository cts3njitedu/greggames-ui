import Ember from 'ember';
import { task } from 'ember-concurrency';
export default Ember.Component.extend({

    showModal: false,
    isCreator: false,
    gameState: null,
    spadeService: Ember.inject.service("spade-service"),
    init() {

        this._super(...arguments);
        var self = this;

        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades', function (response) {
                let newGameState = JSON.parse(response.body);
                that.set("gameState", newGameState);
                that.set("spadeService.gameView",newGameState);
                that.set("showModal", false);
                if (newGameState.newGame != null) {
                    let newGame = newGameState.newGame.gameId;
                    if (self.get("isCreator")) {
                        self.sendAction("playGame", newGame);
                    }
                }
            });

            that.set("subscriber", subscriber);
        });
        // this.get("spadeService").makeSubscriber().then(function(response){
        //     let newGameState = JSON.parse(response);
        //     if(!self.isDestroyed){
        //         self.set("gameState",newGameState);
        //         self.set("showModal",false);
        //         if(newGameState.newGame!=null){
        //             let newGame = newGameState.newGame.gameId;
        //             if(self.get("isCreator")){
        //                 self.sendAction("playGame",newGame);
        //             }
        //         }
        //     }



        // });
    },

    makeSubScrition() {



    },
    willDestroyElement() {
        console.log("Destorying component....");
        this.get("subscriber").unsubscribe();
    },
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
        createNewGame(newGame) {

            this.set("isCreator", true);
            this.sendAction("createNewGame", newGame);


        },
        routeToGame() {



        }
    }
});
