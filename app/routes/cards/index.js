import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
import CardMixin from '../../mixins/card-mixin';
export default Ember.Route.extend(CardMixin,{

    games: null,
    init() {

      this.getGames();

    },
    

    getGames(){

        var self = this;
        var games = this.getCardGames(function(games){
            console.log("sugar honey ice tea");
            Ember.set(self,"games",games);
            self.refresh();

        });
    },
    model() {

        return this.get("games");
    }
});
