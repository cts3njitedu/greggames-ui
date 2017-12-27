import Ember from 'ember';

export default Ember.Route.extend({

    seats: {

        "playerSouth":null,
        "playerWest": null,
        "playerNorth":null,
        "playerEast":null

    },
    seatIds:{

        1:"playerSouth",
        2:"playerWest",
        3:"playerNorth",
        4:"playerEast"
    },

    model(params){

        console.log("Player going to hate");
        const PLAYER = "PLAYER";
        let seatName = params.playerId;
        let seatId = seatName.charAt(seatName.length-1);

        let allPlayers = {};
        let gameView = this.modelFor("greggames.cards.spades.games.game");
        let teams = gameView.teams;
       
        for (var team in teams) {
            if (teams.hasOwnProperty(team)) {
                let players = teams[team].players;
                for(var player in players){

                    allPlayers[player] = players[player];
                }
            }
        }

        let counter = 1;
        while(counter<=gameView.numberOfPlayers){
            
            let position = this.get("seatIds."+counter);
            this.set("seats."+position,allPlayers[PLAYER+seatId]);
            seatId++;
            if(seatId>4){
                seatId = 1;
            }
            counter++;
        }
        console.log(this.get("seats"));

        gameView["seats"]=this.get("seats");
        gameView["playerView"] = params.playerId;
        console.log(gameView);
        return gameView;
    }
});
