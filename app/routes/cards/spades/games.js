import Ember from 'ember';
import SpadeMixin from '../../../mixins/spade-mixin';
export default Ember.Route.extend(SpadeMixin, {


    spadeGameService: Ember.inject.service("spadegames"),



    init() {

        //that.get("getGames")(that);

        //this._getGames();

        this.get("spadeGameService").getInitialGames();
        this.get("spadeGameService").getGames();


    },
    getGames() {

        var self = this;
        var games = this.getSpadeGames(function (games) {

         
            Ember.set(self, "spadeGameService.gameState.games", games);
         
            self.refresh();
        });





    },
    model(params) {

        //console.log(params.gameId);

        //this.get("getGamesSocket")(this);
        //console.log("adfsdfsadfasdf" + JSON.stringify(this.get("gameState")));
        return this.get("spadeGameService.gameState");

    },
    actions: {

        addGame(newGame) {

            console.log(newGame);

            this.get("spadeGameService").addGame(newGame);





        }
    }
});
