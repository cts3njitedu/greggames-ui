import Ember from 'ember';
import SpadeConstants from "../../../../../../../utils/spade-constants"
export default Ember.Route.extend({

    spadeService: Ember.inject.service("spade-service"),

    playerId: null,
    seats: {

        "playerSouth": null,
        "playerWest": null,
        "playerNorth": null,
        "playerEast": null

    },
    seatIds: {

        1: "playerSouth",
        2: "playerWest",
        3: "playerNorth",
        4: "playerEast"
    },
    gameState: {},

    gamePlayers: {},

    model(params) {


        const PLAYER = "PLAYER";
        let seatName = params.playerId;
        this.set("playerId", params.playerId);
        let seatId = seatName.charAt(seatName.length - 1);

        let allPlayers = {};

        let gameView = Ember.copy(this.modelFor("greggames.cards.spades.games.game"), true);
        this.set("gameState", Ember.copy(gameView));
        let teams = gameView.teams;

        for (var team in teams) {
            if (teams.hasOwnProperty(team)) {
                let players = teams[team].players;
                for (var player in players) {

                    allPlayers[player] = players[player];
                }
            }
        }
        this.set("gamePlayers", allPlayers);
        let counter = 1;
        while (counter <= gameView.numberOfPlayers) {

            let position = this.get("seatIds." + counter);
            this.set("seats." + position, allPlayers[PLAYER + seatId]);
            seatId++;
            if (seatId > 4) {
                seatId = 1;
            }
            counter++;
        }


        gameView["seats"] = this.get("seats");
        gameView["playerView"] = params.playerId;


        return gameView;
    },
    actions: {

        playerBid(bid) {

            console.log("Player Route Bid");
            console.log(bid);

            let gameView = Ember.copy(this.get("spadeService.gameView"), true);
            let player = this.get("gamePlayers")[this.get("playerId")];
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
        willTransition(transition){
            console.log("Leaving Page through different url");
            jQuery(window).on('unload',function(){
                console.log("INside jquery leaving page");

            })
            // let gameView = Ember.copy(this.get("spadeService.gameView"), true);
            // gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
            // gameView.gameModifier = player;
            // console.log("Leaving Game....");
            // console.log(gameView);
            // this.get("spadeService").modifyGame(gameView);
            // this.transitionTo("greggames.cards.spades.games.game",gameView.gameId);
        }

        // ,
        // playerCard(card) {

        //     this.sendAction("playerCard",card);
        // }
    },

    saveBeforeClose: Ember.on('init',function(){
        let that = this;
        jQuery(window).on('beforeunload',function(){
            let gameView = Ember.copy(that.get("spadeService.gameView"), true);
            gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
            gameView.gameModifier = that.get("playerId");
            console.log("Leaving Game....");
            console.log(gameView);
            that.get("spadeService").modifyGame(gameView);
            that.transitionTo("greggames.cards.spades.games.game",gameView.gameId);

        })

    })
});
