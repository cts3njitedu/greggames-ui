import Ember from 'ember';
let SockJS = window.SockJS;
let Stomp = window.Stomp;
let stompClient = null;
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    games: null,

    init() {

        var that = this;
        var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        stompClient = Stomp.over(socket);
        that.get("getGames")(that);


    },
    getGames(that) {

        var request = Ember.$.ajax({
            method: 'GET',
            url: ENV.APP.API_HOST + "/cards/spades/games",
            dataType: "json",
            crossDomain: true,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            },


            xhrFields: {
                withCredentials: true
            }
        });
        request.done(function (data) {
            console.log(ENV.APP.API_HOST);
            //data = data.map(v => v.toLowerCase());
            that.set("games", data);
            that.refresh();

        });

    },
    updateGames(content, that) {

        that.set("games", content);
        that.refresh();
    },
    getGamesSocket(that) {



        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/spades', function (response) {


                //that.get("updateGames")(JSON.parse(response.body), that);
                
                that.get("getGames")(that);




            });



        });

    },
    model() {


        this.get("getGamesSocket")(this);
        return this.get("games");
    },
    actions: {

        addGame(newGame) {

            console.log(newGame);

            let newSpadeGame = {
                "pointsToWin": newGame
            }
            stompClient.send("/app/greggames/spades", {}, JSON.stringify(newSpadeGame));





        }
    }
});
