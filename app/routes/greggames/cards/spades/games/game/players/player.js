import Ember from 'ember';
import SpadeConstants from "../../../../../../../utils/spade-constants"
import { task } from 'ember-concurrency';
export default Ember.Route.extend({

    spadeService: Ember.inject.service("spade-service"),
    greggamesService: Ember.inject.service("greggames-service"),


    init() {
        this._super();
        let self = this;
        // setInterval(function(){
        //     //console.log("Pinging from player....");
        //     //self.refresh();
        //     self.get("greggamesService").pingSocket("spades");
        // },5000);

        
    },

    playerId: null,

    isTransition: true,

    gameState: {},

    gamePlayers: {}, 

    model(params) {
        let self = this;

        
    
        return this.get("spadeService").getGame(self.get("spadeService.gameView.gameId")).then(function (game) {
            console.log("What is game value");

            console.log(game);
            return self.get("createPlayerViewTask").perform(game, params);


        })

        // return self.get("createPlayerViewTask").perform(self.modelFor("greggames.cards.spades.games.game"),this.paramsFor);
       
        

    },

    beforeModel(){

        // console.log("Coming again today i said");
        // if(this.get("isTransition")){
        //     this.set("isTransition",false);
        //     this.refresh()
        // }

    },


    createPlayerViewTask: task(function* (game, params) {

        this.set("playerId", params.playerId);
        this.set("gamerId",params.gameId);
        let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,params.playerId);
        console.log(newGameView);
        return this.get("spadeService.gameView");



    }).drop(),


    // playerBidTask: task(function*(bid){



    // }),
    actions: {

        playerBid(bid) {

            console.log("Player Route Bid");
            console.log(bid);

            let gameView = Ember.copy(this.get("spadeService.gameView"), true);
            let player = gameView.seats.PLAYERSOUTH;
            console.log(player);
            // let bidder = 10*bid;
            // this.set("gameView.teams."+player.team+".players."+player.name,bidder);
            // delete gameView.seats;
            // delete gameView.playerView;
            gameView = JSON.parse(JSON.stringify(gameView));
            gameView.teams[player.team].players[player.name].playerBid = 10 * bid;
            // Ember.set(gameViewPlayer, "playerBid", 10 * bid);

            gameView.gameModifier = this.get("playerId");
            // Ember.set(gameView,"gameModifier",this.get("playerId"));
            gameView.playerNotification = SpadeConstants.GAME_STATES.BID
            // Ember.set(gameView,"playerNotification",SpadeConstants.GAME_STATES.BID);
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);
            // window.location.reload(true);

        },
        closeErrorModal() {

            let gameView = Ember.copy(this.get("gameState"));
            Ember.set(gameView, "playerNotification", SpadeConstants.GAME_STATES.RECEIVED_ERROR);

            Ember.set(gameView, "gameModifier", this.get("playerId"));
            console.log("Error");
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);



        },
        playerCard(cardDetails) {

            let gameView = Ember.copy(this.get("spadeService.gameView"), true);

            let player = cardDetails.player;

            let card = JSON.parse(JSON.stringify(cardDetails.card));

            gameView = JSON.parse(JSON.stringify(gameView));
            gameView.teams[player.team].players[player.name].playingCard = card;

            gameView.playerNotification = SpadeConstants.GAME_STATES.PLAY;


            gameView.gameModifier = player.name;
            console.log("Playing card");

            this.get("spadeService").modifyGame(gameView)
        },
        willTransition(transition) {
            // console.log("Leaving Page through different url");
            // let that = this;

            // let gameView = Ember.copy(that.get("spadeService.gameView"), true);
            // gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
            // gameView.gameModifier = that.get("playerId");
            // console.log("Leaving Game....");
            // console.log(gameView);
            // that.get("spadeService").modifyGame(gameView);
            //that.transitionTo("greggames.cards.spades.games.game");
        }

        // ,
        // playerCard(card) {

        //     this.sendAction("playerCard",card);
        // }
    }


    // saveBeforeClose: Ember.on('init', function () {
    //     let that = this;
    //     jQuery(window).on('beforeunload', function () {
    //         let gameView = Ember.copy(that.get("spadeService.gameView"), true);
    //         gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
    //         gameView.gameModifier = that.get("playerId");
    //         console.log("Leaving Game....");
    //         console.log(gameView);
    //         that.get("spadeService").modifyGame(gameView);
    //         //that.transitionTo("greggames.cards.spades.games.game",gameView.gameId);

    //     })

    // })
});
