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
        let gameView = this.modelFor("greggames.cards.spades.games.game");
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
            
            let gameView = Ember.copy(this.get("gameState"));
            let player = this.get("gamePlayers")[this.get("playerId")];
            console.log(player);
            // let bidder = 10*bid;
            // this.set("gameView.teams."+player.team+".players."+player.name,bidder);
            // delete gameView.seats;
            // delete gameView.playerView;
            let gameViewPlayer = gameView.teams[player.team].players[player.name];
            Ember.set(gameViewPlayer, "playerBid", 10 * bid);

            Ember.set(gameView,"gameModifier",this.get("playerId"));
            Ember.set(gameView,"playerNotification",SpadeConstants.GAME_STATES.BID);
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);

        },
        closeErrorModal(){

            let gameView = Ember.copy(this.get("gameState"));
            Ember.set(gameView,"playerNotification",SpadeConstants.GAME_STATES.RECEIVED_ERROR);

            Ember.set(gameView,"gameModifier",this.get("playerId"));
            console.log("Error");
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);



        },
        playerCard(card) {

            let gameView = Ember.copy(this.get("gameState"));
            let player = this.get("gamePlayers")[this.get("playerId")];
            let gameViewPlayer = gameView.teams[player.team].players[player.name];
            Ember.set(gameViewPlayer, "playingCard", card);
            //gameViewPlayer.playingCard = card;
            Ember.set(gameView,"gameModifier",this.get("playerId"));
            Ember.set(gameView,"playerNotification",SpadeConstants.GAME_STATES.PLAY);
            this.get("spadeService").modifyGame(gameView);
        }
    }
});
