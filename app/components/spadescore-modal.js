import Ember from 'ember';

export default Ember.Component.extend({


    teams: Ember.computed("gameView.previousHand.teams",function(){

        let gameTeams = this.get("gameView.previousHand.teams");

        let gameTeamsArray = [];
        for(var team in gameTeams){

            if(gameTeams.hasOwnProperty(team)){

                

                let gamePlayers = gameTeams[team].players;

                let gamePlayersArray=[];

                for(var player in gamePlayers){

                    gamePlayersArray.push(gamePlayers[player]);
                }
                gameTeams[team].players = gamePlayersArray;

                gameTeamsArray.push(gameTeams[team]);
            }
        }
        console.log("Teams United");
        console.log(gameTeamsArray);

        return gameTeamsArray;
    })
});
