import Ember from 'ember';
import ConvertObjectMixin from '../mixins/convert-object-mixin';
export default Ember.Component.extend(ConvertObjectMixin, {


    teams: Ember.computed("gameView.previousHand.teams", function () {

        let gameTeams = this.get("gameView.previousHand.teams");

        console.log("Whaddup my friend.");

        return this.makeTeamArray(gameTeams);

    }),

    playerWon: Ember.computed("teams", function () {

        let allTeams = this.get("teams");
        console.log("Show me the winner!!!!!");
        console.log(this.get("playerName"));

        for (var team in allTeams) {
            if (allTeams.hasOwnProperty(team)) {

                let allPlayers = allTeams[team].players;
                for (var player in allPlayers) {

                    if(allPlayers.hasOwnProperty(player)){
                       if(this.get("player.name")==allPlayers[player].name){

                            return allTeams[team].won;
                       }

                    }
                }

            }


        }
    })

    

});
