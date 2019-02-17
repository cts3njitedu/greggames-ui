import Ember from 'ember';

import SpadeMixin from '../mixins/spade-mixin';
import SpadeConstants from '../utils/spade-constants'
import { task } from 'ember-concurrency';
import async from 'npm:async';
export default Ember.Service.extend(SpadeMixin, {

    gregWebSocket: Ember.inject.service("greg-websocket"),

    gameState: {},

    gameView: {},



    init() {

        this.set("gameState.games", []);

        this.set("isPlayerButtonNorth", true);

    },
    stompClient: null,


    makeConnection: function(){
        let self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            self.get("gregWebSocket").connect(function (stompClient) {
                Ember.set(self, "stompClient", stompClient);

                resolve(stompClient);
            });

        });

    },




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

    getGameView: function(){

        return this.getSpadeGameView();
           

    },

    addGame: function (newGame) {

        let self = this;

        this.get("stompClient").send("/app/greggames/spades", {}, JSON.stringify(newGame));






    },


    getPlayerViewTask: task(function* (game, pid) {
        
        //this.set("gameView", game);
        
        let newGameView = game;
        let currPlayerId = pid;
        let currPlayer = null;
        let allPlayers = {};

        let teams = newGameView.teams;

        async.each(teams, function (team, callback) {

            let players = team.players;

            async.each(players, function (player, callback) {

                if (currPlayerId == player.name) {
                    currPlayer = player;
                }

                allPlayers[player.name] = player;

            })


        });



        let playerPositions = currPlayer.playerPositions;
        newGameView.seats = {};
        async.each(Object.keys(playerPositions),function(position,callback){
            newGameView.seats[position] = allPlayers[playerPositions[position]];
        })
        newGameView.playerView = pid;
        this.set("gameView",newGameView);

        return newGameView;



    }).drop(),

    modifyGame: function (gameView,isNewPlayer) {

        


        this.get("stompClient").send("/app/greggames/spades/" + gameView.gameId, {}, JSON.stringify(gameView));

     
        if(isNewPlayer){

            this.get("stompClient").send("/app/greggames/spades", {}, JSON.stringify(gameView));
        }




    },


    getPlayerView: function (gameView) {


        this.get("stompClient").send("/app/greggames/spades/" + gameView.gameId, {}, JSON.stringify(gameView));


    },

    getGame: function (gameId) {

        console.log("Game being called");
        console.log(gameId);
        return this.getGameById(gameId);
    },

    leaveGame: function(player){
        let gameView = Ember.copy(this.get("gameView"), true);
        gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
        gameView.gameModifier = player;
        console.log("Leaving Game....");
        console.log(gameView);
        this.modifyGame(gameView);
    }




});
