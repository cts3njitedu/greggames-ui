import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
import GregGameAjaxMixin from './greggame-ajax-mixin';
export default Ember.Mixin.create(GregGameAjaxMixin, {

    getSpadeGames: function (cb) {

        this.doGet("/api/cards/spades/games").then(function (response) {


            cb(response);


        });


    }
});
