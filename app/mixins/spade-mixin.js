import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
import GregGameAjaxMixin from './greggame-ajax-mixin';
export default Ember.Mixin.create(GregGameAjaxMixin, {

    getSpadeGames: function () {

        return this.doGet("/api/cards/spades/games");


    },
    getGameById: function(gameId){


        return this.doGet("/api/cards/spades/games/"+gameId);
    },

    updateGame: function(gameView){


        return this.doPut("/api/cards/spades/games/"+gameView.gameId,gameView);
    },

    getSpadeGameView: function(){

        return this.doGet("/api/cards/spades/view");
    }


    
});
