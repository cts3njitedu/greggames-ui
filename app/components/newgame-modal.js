import Ember from 'ember';

export default Ember.Component.extend({


    newGame: {

        pointsToWin: 500,
        bags: 10,
        bagPoints: 100,
        bidNilPoints: 100,
        numberOfTeams: 2,
        pointsToLose: -100
    },

    actions: {

        createNewGame(){

            this.sendAction("createNewGame",this.get("newGame"));
        },
        cancelGame(){

           this.sendAction("cancelGame");
        }

    }

    
});
