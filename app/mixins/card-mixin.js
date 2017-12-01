import Ember from 'ember';
import GregGameAjaxMixin from './greggame-ajax-mixin';
export default Ember.Mixin.create(GregGameAjaxMixin, {


    getCardGames: function (cb) {

       this.doGet("/api/greggames/cards").then(function (response) {

            cb(response.map(v => v.toLowerCase()));
            


        })


    }
});
