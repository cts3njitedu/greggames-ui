import Ember from 'ember';
import { task } from 'ember-concurrency';
export default Ember.Component.extend({

    spadeService: Ember.inject.service("spade-service"),
    isPlayerCreator: false,
    isGameView: Ember.computed("playerView", function () {

        return this.get("playerView") == null;
    }),
    init(){

        this._super();
        console.log("This is spade table");
        
        let self = this;

        
    },
    createPlayerViewTask: task(function* (game) {
        
        let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,this.get("playerView"));
        console.log(newGameView);
        this.set("gameView",newGameView);
        return this.get("spadeService.gameView");



    }).drop(),

    gameView: Ember.computed("spadeService.gameDetails","spadeService.playerDetails",function(){
        if(this.get("isGameView")){
            return this.get("spadeService.gameDetails");
        }
        else{
            return this.get("spadeService.playerDetails");
        }

    }),

    playerMessage: Ember.computed("spadeService.playerMessage",function(){

       
        return this.get("spadeService.playerMessage");
        

    }),
    teams: Ember.computed("gameView.teams",function(){

        let gameTeams = this.get("gameView.teams");
        let gameTeamsArray = [];
        for(var team in gameTeams){

            if(gameTeams.hasOwnProperty(team)){
                gameTeamsArray.push(gameTeams[team]);
            }
        }

        return gameTeamsArray;
    }),

    willDestroyElement() {
        // console.log("Destorying component....");
        // if(this.get("isPlayerCreator")){
        //     this.get("subscriber").unsubscribe();
        // }
        
        
    },
    willDestroy(){
        // this.get("subscriber").unsubscribe();
        // this.set("isPlayerCreator",true);
        console.log("Wow it has been destroyed");
    },
    actions: {

        createPlayerView(playerId){

            this.set("isPlayerCreator",true);
            this.sendAction("createPlayerView",playerId);
        },
        renderGameView(gameId){

            console.log(gameId);
            console.log(this.get("playerName"));
            this.sendAction("renderGameView",gameId);
        },
        startGame(gameView){
            this.sendAction("startGame",gameView);
        },
        leaveGame(player){
            this.sendAction("leaveGame",player);
        },
        playerBid(bid){
            this.sendAction("playerBid",bid);
        },
        playerCard(cardDetails){
            this.sendAction("playerCard",cardDetails);
        },
        playAgain(gameView){
            console.log("We are playing again!!!!!<<<<");
        }
    }
});
