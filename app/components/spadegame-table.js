import Ember from 'ember';

export default Ember.Component.extend({

    init(){

        this._super();
        console.log("This is spade table");
        console.log(this.get("playerName"));
    },

    teams: Ember.computed("gameView.teams",function(){

        let gameTeams = this.get("gameView.teams");
        let gameTeamsArray = [];
        for(var team in gameTeams){

            if(gameTeams.hasOwnProperty(team)){
                gameTeamsArray.push(gameTeams[team]);
            }
        }

        return gameTeamsArray;
    }),

    actions: {

        createPlayerView(playerId){

            this.sendAction("createPlayerView",playerId);
        },
        renderGameView(gameId){

            console.log(gameId);
            this.sendAction("renderGameView",gameId);
        }

    }
});
