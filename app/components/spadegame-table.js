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

        this.set("gameView",this.get("spadeService.gameView"));
        
    },
    createPlayerViewTask: task(function* (game) {
        
        let newGameView = yield this.get("spadeService").get("getPlayerViewTask").perform(game,this.get("playerView"));
        console.log(newGameView);
        this.set("gameView",newGameView);
        return this.get("spadeService.gameView");



    }).drop(),

    gameView: Ember.computed("spadeService.gameView",function(){
        console.log("Game View for life");
        return this.gets("spadeService.gameView");

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
        }
    }
});
