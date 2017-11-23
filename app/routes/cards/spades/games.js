import Ember from 'ember';
let SockJS = window.SockJS;
let Stomp = window.Stomp;
let stompClient = null;
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    gameState: {},

    init() {

        var that = this;
        var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        stompClient = Stomp.over(socket);
        that.get("getGames")(that);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/spades', function (response) {


                //that.get("updateGames")(JSON.parse(response.body), that);
                console.log("Response:");
                let resp = JSON.parse(response.body);
                console.log(resp.gameId);
                that.get("getGames")(that);
                that.set("gameState.gameId",resp.gameId);
                
               // that.transitionTo('cards.spades.games.game',resp.gameId);





            });



        });
        


    },
    getGames(that) {

        var request = Ember.$.ajax({
            method: 'GET',
            //url: ENV.APP.API_HOST + "/cards/spades/games",
            url: "/cards/spades/games",
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
            that.set("gameState.games", data);
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
                console.log("Response:");
                console.log(response.body);
                that.get("getGames")(that);
                





            });



        });

    },
    model(params) {

        //console.log(params.gameId);
        
        //this.get("getGamesSocket")(this);
        console.log("adfsdfsadfasdf"+this.get("gameState"));
        return this.get("gameState");
        
    },
    actions: {

        addGame(newGame) {

            console.log(newGame);

            stompClient.send("/app/greggames/spades", {}, JSON.stringify(newGame));





        }
    }
});
