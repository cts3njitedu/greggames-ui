import Ember from 'ember';
import SpadeConstants from '../../../../../utils/spade-constants'
import {task} from 'ember-concurrency';
export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),
    greggamesService: Ember.inject.service("greggames-service"),

    isGetGame: true,

    init(){

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

        // console.log("Comming again: " + this.get("isSocket"));
        // if(this.get("refreshGameRoute")){
        //     this.set("refreshGameRoute",false);
        //     window.location.reload(true);
        // }
        // }
        // if (this.get("isSocket")) {
        //     this.set("isSocket", false);
        //     this.transitionTo("greggames.cards.spades.games.game.players.player", this.get("spadeService.gameView.gameId"), this.get("playerId"));
        //     //this.transitionTo("greggames.cards.spades.games.game", this.get("spadeService.gameView.gameId"));
        // }

    },


    model(params) {

        let gameViewTemp = this.get("spadeService.gameView");

        let self = this;

        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            console.log(params);
            let subscriber = stompClient.subscribe('/topic/spades/' + params.gameId, function (response) {
                    
               self.set("spadeService.gameView",JSON.parse(response.body));
               self.refresh();
                        
            });

            that.set("subscriber", subscriber);
        });
        
        // this.get("spadeService.stompClient").ws.onclose(function(res){
        //     self.refresh();
        // })
        return this.get("spadeService").getGame(params.gameId).then(function (game) {
            console.log("Single game");


            self.set("spadeService.gameView", game);

            let gameView = self.get("spadeService.gameView");

            console.log(gameView);
            return self.get("spadeService.gameView");

        })




    },
    // createGameViewTask: task(function* (game, params) {

    //     let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,"PLAYER1");
    //     //console.log(newGameView);
    //     return this.get("spadeService.gameView");



    // }).drop(),
    createPlayerViewTask: task(function*(playerMetaData){

        console.log("This is a task");
        let gameView = this.get("spadeService.gameView");
        gameView.newPlayer = true;
        console.log("We are marshal");
        console.log(gameView);
        console.log(playerMetaData.name);

        gameView.teams[playerMetaData.team].players[playerMetaData.name].userId = playerMetaData.name;
        this.set("isSocket", true);
        this.set("playerId", playerMetaData.name);
        Ember.set(gameView, "playerNotification", SpadeConstants.GAME_STATES.NEW_PLAYER);
        Ember.set(gameView, "gameModifier",playerMetaData.name);
        console.log(gameView);
        let self = this;
        

        yield  self.get("spadeService").modifyGame(gameView,true);
        
        this.refresh();
        console.log("Transitioning---0");
        self.transitionTo("greggames.cards.spades.games.game.players.player", self.get("spadeService.gameView.gameId"), self.get("playerId"));
    

    }).drop(),

    leaveGameTask: task(function*(player){


        console.log("Sugar Honey Ice Teaasfdsafsoo3ir0");
        this.set("refreshGameRoute",true);
        let gameView = Ember.copy(this.get("spadeService.gameView"), true);
        gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
        gameView.gameModifier = player;
        console.log("Leaving Game....");
        console.log(gameView);
        
        yield this.get("spadeService").modifyGame(gameView,true);
        let self=this;
        //window.location.reload(true);

        //this.refresh();
        // this.refresh();
        yield this.transitionTo("greggames.cards.spades.games.game",this.get("spadeService.gameView").gameId);
        // this.refresh();
        //window.location.reload(true);
        
        

    }).drop(),
    actions: {

        createPlayerView(playerMetaData) {


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
