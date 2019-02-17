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
 

    },


    sample: Ember.computed("spadeService.newGameId", function () {

        console.log("I like sports");
        return this.get("spadeService.newGameId");
    }),
    subscribe() {
        let self = this;


    },
    beforeModel(){

        if(this.get("isCreator")){
            this.set("isCreator",false);
            this.transitionTo("greggames.cards.spades.games.game",this.get("spadeService.gameState.newGameId"))
        }


    },
    model(params) {

       
        var self = this;
        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades', function (response) {
                
                let newGameState = JSON.parse(response.body);
                that.set("spadeService.gameView",newGameState);  
                
            });

            that.set("subscriber", subscriber);
        });

        return this.get("spadeService").getGameView().then(function (response) {
     
           
            self.set("spadeService.gameState", response);
            //self.set("spadeService.gameState.newGameId",self.get("spadeService.gameState.newGameId"));

            return self.get("spadeService.gameState");
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
