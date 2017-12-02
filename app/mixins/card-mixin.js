import Ember from 'ember';
import GregGameAjaxMixin from './greggame-ajax-mixin';
export default Ember.Mixin.create(GregGameAjaxMixin, {


    getCardGames: function (cb) {

        return this.doGet("/api/greggames/cards");


    }
});
