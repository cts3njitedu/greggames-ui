import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants'
export default Ember.Component.extend({

    spadeService: Ember.inject.service("spade-service"),

    // gameView: Ember.computed("spadeService.gameView",function(){
    //     return this.get("spadeService.gameView");
    // }),

    init(){
        this._super(...arguments);
       
    },
    isStarting: Ember.computed("gameView.gameNotification",function(){


        return this.get("gameView.gameNotification")==SpadeConstants.GAME_STATES.START;



    }),





    actions: {
    
        startGame(gameView){
           
            this.sendAction("startGame",gameView);
        }
    }
});
