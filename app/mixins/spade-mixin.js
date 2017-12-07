import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
import GregGameAjaxMixin from './greggame-ajax-mixin';
export default Ember.Mixin.create(GregGameAjaxMixin, {

    getSpadeGames: function () {

        return this.doGet("/api/cards/spades/games");


    },
    getGameById: function(gameId){


        return this.doGet("/api/cards/spades/games/"+gameId);
    }
});
