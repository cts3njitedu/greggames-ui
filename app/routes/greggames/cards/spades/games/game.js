import Ember from 'ember';
import SpadeConstants from '../../../../../utils/spade-constants'
export default Ember.Route.extend({


    spadeService: Ember.inject.service("spade-service"),

    isGetGame: true,

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
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);

        },
        startGame(gameView) {

            console.log("Please work now");
            this.set("isGetGame", false);
            // console.log(gameView);
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
        }

    }
});
