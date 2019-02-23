import Ember from 'ember';
import SpadeConstants from "../../../../../../../utils/spade-constants"
import { task } from 'ember-concurrency';
export default Ember.Route.extend({

    spadeService: Ember.inject.service("spade-service"),
    greggamesService: Ember.inject.service("greggames-service"),


    init() {
        this._super();
        let self = this;
        // setInterval(function(){
        //     //console.log("Pinging from player....");
        //     //self.refresh();
        //     self.get("greggamesService").pingSocket("spades");
        // },5000);

        this.set("spadeService.playerDetailsView",{});
    },

    playerId: null,

    isTransition: true,

    gameState: {},

    gamePlayers: {}, 

    model(params) {
        let self = this;

        console.log("Player params: ");
        let gameId = this.paramsFor('greggames.cards.spades.games.game').gameId;
        console.log(params);
        params.gameId = gameId;

        this.set("spadeService.playerDetails",null);

        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades/' + params.gameId, function (response) {
                self.set("spadeService.playerDetails",null);
                var newGame = JSON.parse(response.body);
                let thatOne = that;
               self.get("createPlayerViewTask").perform(newGame, params);
                    
            });

            that.set("subscriber", subscriber);
        });

        this.get("spadeService").makeConnection().then(function (stompClient) {
            let that = self;
            let subscriber = stompClient.subscribe('/topic/spades/' + params.gameId + "/" + params.playerId, function (response) {
                self.set("spadeService.playerMessage",JSON.parse(response.body));  
                    
            });

            that.set("subscriberPlayer", subscriber);
        });
        
        return this.get("spadeService").getGame(gameId).then(function (game) {
            console.log("What is game value");

            console.log(game);
            return self.get("createPlayerViewTask").perform(game, params);


        })

        // return self.get("createPlayerViewTask").perform(self.modelFor("greggames.cards.spades.games.game"),this.paramsFor);
       
        

    },

    beforeModel(){

        // console.log("Coming again today i said");
        // if(this.get("isTransition")){
        //     this.set("isTransition",false);
        //     this.refresh()
        // }
        this.get("spadeService").deleteSubscribers();

    },


    createPlayerViewTask: task(function* (game, params) {

        this.set("playerId", params.playerId);
        this.set("gamerId",params.gameId);
        console.log("Player Id: "+params.playerId);
        let that = this;
        let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,params.playerId,function(newGame){
            console.log('In call back player');
        
            that.set("spadeService.playerDetails",newGame);

        });
        // let newGameView = this.get("spadeService").get("getPlayerViewTask")(game,params.playerId);
        // yield 
        // return this.get("spadeService.playerDetails");



    }),


    // playerBidTask: task(function*(bid){



    // }),

    deactivate:function(){
        this.set("spadeService.playerDetails",null);
        this.get("subscriber").unsubscribe();
        this.get("subscriberPlayer").unsubscribe();
    },
    actions: {

        playerBid(bid) {

            console.log("Player Route Bid");
            console.log(bid);

            let gameView = Ember.copy(this.get("spadeService.playerDetails"), true);
            let player = gameView.seats.PLAYERSOUTH;
            console.log(player);
            // let bidder = 10*bid;
            // this.set("gameView.teams."+player.team+".players."+player.name,bidder);
            // delete gameView.seats;
            // delete gameView.playerView;
            gameView = JSON.parse(JSON.stringify(gameView));
            gameView.teams[player.team].players[player.name].playerBid = 10 * bid;
            // Ember.set(gameViewPlayer, "playerBid", 10 * bid);

            gameView.gameModifier = this.get("playerId");
            // Ember.set(gameView,"gameModifier",this.get("playerId"));
            gameView.playerNotification = SpadeConstants.GAME_STATES.BID
            // Ember.set(gameView,"playerNotification",SpadeConstants.GAME_STATES.BID);
            console.log(gameView);
            
            this.get("spadeService").modifyGame(gameView);
            // window.location.reload(true);

        },
       
        closeErrorModal() {

            let gameView = Ember.copy(this.get("gameState"));
            Ember.set(gameView, "playerNotification", SpadeConstants.GAME_STATES.RECEIVED_ERROR);

            Ember.set(gameView, "gameModifier", this.get("playerId"));
            console.log("Error");
            console.log(gameView);
            this.get("spadeService").modifyGame(gameView);



        },
        playerCard(cardDetails) {

            let gameView = Ember.copy(this.get("spadeService.playerDetails"), true);

            let player = cardDetails.player;

            let card = JSON.parse(JSON.stringify(cardDetails.card));

            gameView = JSON.parse(JSON.stringify(gameView));
            gameView.teams[player.team].players[player.name].playingCard = card;

            gameView.playerNotification = SpadeConstants.GAME_STATES.PLAY;


            gameView.gameModifier = player.name;
            console.log("Playing card");

            this.get("spadeService").modifyGame(gameView)
        },
        willTransition(transition) {
            // console.log("Leaving Page through different url");
            // let that = this;

            // let gameView = Ember.copy(that.get("spadeService.gameView"), true);
            // gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
            // gameView.gameModifier = that.get("playerId");
            // console.log("Leaving Game....");
            // console.log(gameView);
            // that.get("spadeService").modifyGame(gameView);
            //that.transitionTo("greggames.cards.spades.games.game");
        }

        // ,
        // playerCard(card) {

        //     this.sendAction("playerCard",card);
        // }
    }


    // saveBeforeClose: Ember.on('init', function () {
    //     let that = this;
    //     jQuery(window).on('beforeunload', function () {
    //         let gameView = Ember.copy(that.get("spadeService.gameView"), true);
    //         gameView.playerNotification = SpadeConstants.GAME_STATES.LEAVE_GAME;
    //         gameView.gameModifier = that.get("playerId");
    //         console.log("Leaving Game....");
    //         console.log(gameView);
    //         that.get("spadeService").modifyGame(gameView);
    //         //that.transitionTo("greggames.cards.spades.games.game",gameView.gameId);

    //     })

    // })
});
