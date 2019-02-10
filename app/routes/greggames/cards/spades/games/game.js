import Ember from 'ember';
import SpadeConstants from '../../../../../utils/spade-constants'
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


    },

    beforeModel() {


        if (this.get("isSocket")) {
            this.set("isSocket", false);
            this.transitionTo("greggames.cards.spades.games.game.players.player", this.get("spadeService.gameView.gameId"), this.get("playerId"));
            //this.transitionTo("greggames.cards.spades.games.game", this.get("spadeService.gameView.gameId"));
        }

    },


    model(params) {

        let gameViewTemp = this.get("spadeService.gameView");

        let self = this;

        this.get("spadeService").makeGameSubscriber(params.gameId).then(function (response) {

            //self.set("spadeService.gameState.games",response);

            console.log("This is strange");
            self.set("isGetGame", true);
            self.refresh();

        });

        this.get("greggamesService").makePingSubscriber("spades").then(function(response){


            //console.log("Pinging Socket for Spade");
        
        });

        return this.get("spadeService").getGame(params.gameId).then(function (game) {
            console.log("Single game");


            self.set("spadeService.gameView", game);
           
            

            //self.refresh();


            let gameView = self.get("spadeService.gameView");

            console.log(gameView);
            return self.get("spadeService.gameView");

        })




    },
    actions: {

        createPlayerView(playerMetaData) {


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
            this.get("spadeService").modifyGame(gameView,true);

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

            
        },
        renderGameView(gameId){
           
            this.transitionTo("greggames.cards.spades.games.game",gameId);
        },

        leaveGame(player){
            console.log("Sugar Honey Ice Teaasfdsafsoo3ir0");
            let gameView = Ember.copy(this.get("spadeService.gameView"), true);
            gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
            gameView.gameModifier = player;
            console.log("Leaving Game....");
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView,true);
            this.transitionTo("greggames.cards.spades.games.game",gameView.gameId);

        }

    }
});
