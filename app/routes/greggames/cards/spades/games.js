import Ember from 'ember';
import SpadeConstants from '../../../../utils/spade-constants';
import {task} from 'ember-concurrency';
export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),
    greggamesService: Ember.inject.service("greggames-service"),
    historyService: Ember.inject.service("history-service"),
    socketService: Ember.inject.service("greg-websocket"),
    value: null,

    isSocket: false,


    init() {
        // this.get("spadeService").makeConnection();

    },


    sample: Ember.computed("spadeService.newGameId", function () {

        console.log("I like sports");
        return this.get("spadeService.newGameId");
    }),
    subscribe() {
        let self = this;


    },
    beforeModel(){

    },

    deactivate:function(){
        this.get("subscriber").unsubscribe();
    },
    model(params) {

       
        var self = this;
        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades', function (response) {
                
                let newGameState = JSON.parse(response.body);
                let thatOne = that;
                that.get("spadeService").getGameView().then(function (response) {
                
                    newGameState.spadeGames = response.spadeGames;
                    thatOne.set("spadeService.gameView",newGameState); 
                    // console.log("buffer is good");
                    // console.log(Buffer.from(JSON.parse(newGameState).data));
                    if(thatOne.get("isCreator")){
                        thatOne.set("isCreator",false);
                        thatOne.transitionTo("greggames.cards.spades.games.game",that.get("spadeService.gameView.newGame.gameId"))
                    }

                    //self.set("spadeService.gameState.newGameId",self.get("spadeService.gameState.newGameId"));
                });
                //console.log("Tissue paper!!!/1/.1");
                //console.log(newGameState);
                
                 
                
            });

            that.set("subscriber", subscriber);
        });

        return this.get("spadeService").getGameView().then(function (response) {
            // console.log("buffer is good");
            // console.log(Buffer.from(JSON.parse(response).data));
           
            self.set("spadeService.gameView", response);
            //self.set("spadeService.gameState.newGameId",self.get("spadeService.gameState.newGameId"));
            return self.get("spadeService.gameView");
        });

    },
    createNewGameTask: task(function*(newGame){

        let self = this;
        console.log("Creating game....");
        this.set("isSocket",true);
        this.set("isCreator",true);
        newGame["gameNotification"]=SpadeConstants.GAME_STATES.CREATE;
        yield this.get("spadeService").addGame(newGame);

        


    }),

    // setupController:function(controller,model){
    //     controller.set('gameView',Ember.computed("spadeService.gameView",function(){
    //         return this.get("spadeService.gameView");
    //     }));
    // },
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

            
            this.get("createNewGameTask").perform(newGame);
            //console.log("Please Help me");
            // console.log(this.get("sample"));
        },
    }
});
