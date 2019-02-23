import Ember from 'ember';
import SpadeConstants from '../../../../../utils/spade-constants'
import {task} from 'ember-concurrency';
export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),
    greggamesService: Ember.inject.service("greggames-service"),

    isGetGame: true,

    isCreator: false,
    init(){

        console.log("Comming here a second time");
        // this._super();
        // let self = this;
        // setInterval(function(){
        //     console.log("Pinging from client....");
        //     self.get("greggamesService").pingSocket("spades");
        // },5000);

        // let self = this;
        // this.get("spadeService").makeConnection().then(function (stompClient) {
        //     let that = self;
        //     let subscriber = stompClient.subscribe('/topic/spades/' + that.get("gameView.gameId"), function (response) {
        //         that.set("spadeService.gameView",JSON.parse(response.body));
        //         that.refresh();
                
        //     });

        //     that.set("subscriber", subscriber);
        // });


    },

    beforeModel() {
        // console.log("beforekdie");
        // if(this.get("isCreator")){
        //     this.set("isCreator",false);
        //     console.log("Creating again");
        //     this.transitionTo("greggames.cards.spades.games.game.players.player", this.get("gamerId"), this.get("playerId"));
        // }
        this.get("spadeService").deleteSubscribers();
    },


    model(params) {

        let gameViewTemp = this.get("spadeService.gameView");

        let self = this;

        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades/' + params.gameId, function (response) {
                
                var newGame = JSON.parse(response.body);
                let thatOne = that;
             
                thatOne.get("createGameViewSubscriberTask").perform(newGame, params);
                // that.get("spadeService").getGame(params.gameId).then(function (game) {
                //     console.log("Single game");
                //     thatOne.get("createGameViewSubscriberTask").perform(game, params);
        
                // });     
            });
        
            that.set("subscriber", subscriber);
        });
        
        // this.get("spadeService.stompClient").ws.onclose(function(res){
        //     self.refresh();
        // })
        return this.get("spadeService").getGame(params.gameId).then(function (game) {
            console.log("Single game");
            return self.get("createGameViewTask").perform(game, params);

        })

    },
    createPlayerViewTask: task(function*(playerMetaData){

        
        let gameView = Ember.copy(this.get("spadeService.gameDetails"),true);
        gameView.newPlayer = true;
        console.log(gameView);
        console.log(playerMetaData.name);

        gameView.teams[playerMetaData.team].players[playerMetaData.name].userId = playerMetaData.name;
        this.set("isCreator", true);
        this.set("playerId", playerMetaData.name);
        this.set("gamerId",gameView.gameId);
        Ember.set(gameView, "playerNotification", SpadeConstants.GAME_STATES.NEW_PLAYER);
        Ember.set(gameView, "gameModifier",playerMetaData.name);
        console.log(gameView);
        let self = this;
        

        yield  self.get("spadeService").modifyGame(gameView,true);
        // yield self.transitionTo("greggames.cards.spades.games.game.players.player", self.get("spadeService.gameDetails.gameId"), self.get("playerId"));
        

    }).drop(),

    createGameViewSubscriberTask: task(function*(game,params){
        let self = this;
        console.log("Value of creator is : "+self.get("isCreator"));
        if(self.get("isCreator")){
            self.set("isCreator",false);
            console.log("Creator....");
            console.log(self.get("playerId"));
            self.transitionTo("greggames.cards.spades.games.game.players.player", this.get("gamerId"), this.get("playerId"));
            
        }
        else if(self.get("isLeavingGame")){
           self.set("isLeavingGame",false);
            console.log("Leaving....");
            yield self.get("createGameViewTask").perform(game, params);
           self.transitionTo("greggames.cards.spades.games.game",self.get("gamerId"));

        }
        else{
            let x = yield self.get("createGameViewTask").perform(game, params);
        }
       
        


    }),
    createGameViewTask: task(function* (game,params) {

        //hardcode to player1
        console.log("Game View Task");
        this.set("playerId", "PLAYER1");
        this.set("gamerId",params.gameId);
        let that = this;
        let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,this.get("playerId"),function(newGame){
            console.log("in call back game");
            that.set("spadeService.gameDetails",newGame);
        });

        return this.get("spadeService.gameDetails");



    }),
    leaveGameTask: task(function*(player){


        console.log("Sugar Honey Ice Teaasfdsafsoo3ir0");
        this.set("refreshGameRoute",true);
        let gameView = Ember.copy(this.get("spadeService.gameDetails"), true);
        gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
        gameView.gameModifier = player;
        console.log("Leaving Game....");
        this.set("gamerId",gameView.gameId);
        this.set("isLeavingGame",true);
        yield this.get("spadeService").modifyGame(gameView,true);
        let self=this;
        //window.location.reload(true);

        //this.refresh();
        // this.refresh();
        // yield this.transitionTo("greggames.cards.spades.games.game",this.get("spadeService.gameView").gameId);
        // this.refresh();
        //window.location.reload(true);
        
        

    }).drop(),


    deactivate:function(){
        this.get("subscriber").unsubscribe();
    },
    actions: {

        createPlayerView(playerMetaData) {

            // console.log("We are here");
            this.get("createPlayerViewTask").perform(playerMetaData);
            

        },
        startGame(gameView) {

            console.log("Please work now");
          
            console.log(gameView);
            Ember.set(gameView, "playerNotification", SpadeConstants.GAME_STATES.START);
            this.get("spadeService").modifyGame(gameView);
        },

        trickOver(player) {

            let gameView = Ember.copy(this.get("spadeService.gameView"), true);

            gameView.playerNotification = SpadeConstants.GAME_STATES.RECEIVED_TRICK_OVER;
            gameView.gameModifier = player;
            console.log("Trick is Over Baby");
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);
        },
        pingSocket(){
            console.log("Faking pinging>>>>yeah");
            
        },
        renderGameView(gameId){
           console.log("This is before");
           console.log(gameId);
            this.transitionTo("greggames.cards.spades.games.game",gameId);
        },

        leaveGame(player){
            
            this.get("leaveGameTask").perform(player);
        }

    }
});
