import Ember from 'ember';
import CardMixin from '../mixins/card-mixin';
export default Ember.Service.extend(CardMixin,{

    gregWebSocket: Ember.inject.service("greg-websocket"),

    games: null,


    getInitialGames(other){

        var self = this;
        var games = this.getCardGames().then(function(games){
            //console.log("sugar honey ice tea");
            Ember.set(self,"games",games);
            other.refresh();

        });

    },
    makePingSubscriber: function (gameType) {


        let that = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {

            let self = that;
            self.get("gregWebSocket").connect(function (stompClient) {
                Ember.set(self, "stompClient", stompClient);
                let _self = self;
                stompClient.subscribe('/topic/'+gameType+"/ping", function (response) {




                    resolve(response.body);






                });



            });


        })






    },
    makePingSubscriber2: function (gameType) {


        let that = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {

            let self = that;
            self.get("gregWebSocket").connect(function (stompClient) {
                Ember.set(self, "stompClient", stompClient);
                let _self = self;
                stompClient.subscribe("/topic/ping", function (response) {




                    resolve(response.body);






                });



            });


        })






    },
    pingSocket: function(gameType){
        let req= {
            "message":"Sugar Honey Ice Tea"
        }
        //this.get("stompClient").send("/app/greggames/"+gameType+"/ping" , {}, JSON.stringify(req));
        this.get("stompClient").send("/app/greggames/ping" , {}, JSON.stringify(req));
    }

});
