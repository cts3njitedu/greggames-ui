import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants'
export default Ember.Component.extend({



    isStarting: Ember.computed("gameView.gameNotification",function(){


        return this.get("gameView.gameNotification")==SpadeConstants.GAME_STATES.START;



    }),





    actions: {
    
        startGame(gameView){

            this.sendAction("startGame",gameView);
        }
    }
});
