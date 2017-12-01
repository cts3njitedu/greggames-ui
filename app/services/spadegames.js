import Ember from 'ember';
import SpadeMixin from '../mixins/spade-mixin';
export default Ember.Service.extend(SpadeMixin, {

    gregWebSocket: Ember.inject.service("greg-websocket"),

    gameState: {},

    stompClient: null,


    getGames: function () {
        let self = this;
        this.get("gregWebSocket").connect(function (stompClient) {
            Ember.set(self, "stompClient", stompClient);
            let _self = self;
            stompClient.subscribe('/topic/spades', function (response) {


                //that.get("updateGames")(JSON.parse(response.body), that);
                console.log("Response:");
                let resp = JSON.parse(response.body);
                console.log(resp.gameId);

                let __self = _self;
                _self.getSpadeGames(function (games) {

                    Ember.set(__self, "gameState.games", games);
                    Ember.set(__self, "gameState.gameId", resp.gameId);
                })

                // that.transitionTo('cards.spades.games.game',resp.gameId);





            });

        });


    },
    getInitialGames: function () {

        let self = this;
        this.getSpadeGames(function (games) {

            Ember.set(self, "gameState.games", games);
          
        })

    },

    addGame: function (newGame) {

        this.get("stompClient").send("/app/greggames/spades", {}, JSON.stringify(newGame));


    }




});
