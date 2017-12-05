import Ember from 'ember';

import SpadeMixin from '../mixins/spade-mixin';
export default Ember.Service.extend(SpadeMixin, {

    gregWebSocket: Ember.inject.service("greg-websocket"),

    gameState: {},

    stompClient: null,

  


    makeSubscriber: function (other) {


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
                Ember.get(__self,"gameState.games").pushObject(resp);
                Ember.set(__self,"gameState.gameId",resp.gameId);
                other.refresh();

                // _self.getSpadeGames().then(function (games) {

                //     Ember.get(__self,"gameState.games").pushObject()
                //     Ember.set(__self, "gameState.games", games);
                //     Ember.set(__self, "gameState.gameId", resp.gameId);
                //     other.refresh();
                //     other.transitionTo("greggames.spades.games.game",resp.gameId);
                // })

                // that.transitionTo('cards.spades.games.game',resp.gameId);





            });

        });






    },
    getInitialGames: function (other) {

        let self = this;
        this.getSpadeGames().then(function (games) {

            Ember.set(self, "gameState.games", games);
            Ember.set(self, "gameState.gameId", "");

            other.refresh();

        })




    },

    addGame: function (newGame) {

        let self = this;

            this.get("stompClient").send("/app/greggames/spades", {}, JSON.stringify(newGame));

           
        



    }




});
