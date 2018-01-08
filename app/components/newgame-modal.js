import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants'
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

            this.set("newGame.bags",SpadeConstants.SPADE_BOOK_VALUE*this.get("newGame.bags"));
            this.sendAction("createNewGame",this.get("newGame"));
        },
        cancelGame(){

           this.sendAction("cancelGame");
        }

    }

    
});
