import Ember from 'ember';

import SpadeMixin from '../mixins/spade-mixin';
export default Ember.Service.extend(SpadeMixin, {

    gregWebSocket: Ember.inject.service("greg-websocket"),

    gameState: {},

    gameView: {},



    init() {

        this.set("gameState.games", []);

        this.set("isPlayerButtonNorth", true);

    },
    stompClient: null,







    makeGameSubscriber: function (gameId) {

        let that = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {

            let self = that;
            self.get("gregWebSocket").connect(function (stompClient) {
                Ember.set(self, "stompClient", stompClient);
                let _self = self;
                stompClient.subscribe('/topic/spades/' + gameId, function (response) {





                    resolve(response.body);






                });



            });


        })


    },

    makeSubscriber: function () {


        let that = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {

            let self = that;
            self.get("gregWebSocket").connect(function (stompClient) {
                Ember.set(self, "stompClient", stompClient);
                let _self = self;
                stompClient.subscribe('/topic/spades', function (response) {




                    resolve(response.body);






                });



            });


        })






    },
    getInitialGames: function () {

        let self = this;
        return this.getSpadeGames();




    },

    addGame: function (newGame) {

        let self = this;

        this.get("stompClient").send("/app/greggames/spades", {}, JSON.stringify(newGame));






    },


    modifyGame: function (gameView) {

        var self = this;



        self.get("stompClient").send("/app/greggames/spades/" + gameView.gameId, {}, JSON.stringify(gameView));





    },


    getPlayerView: function (gameView) {


        this.get("stompClient").send("/app/greggames/spades/" + gameView.gameId, {}, JSON.stringify(gameView));


    },

    getGame: function (gameId) {

        console.log("Game being called");
        console.log(gameId);
        return this.getGameById(gameId);
    }





});
