import Ember from 'ember';

export default Ember.Component.extend({

    buttonValue: "New Game",
    game:null,

    actions: {

        createView(){
            this.set("isGameView",false);
            this.set("isCreateView",true);
        },
        closeView(){

            this.set("isGameView",true);
            this.set("isCreateView",false);
        },
        addGame(){

            //console.log("Sugar Honey Ice Tea");
            this.set("isEnterGame",true);
            this.set("isCreateView",false);
            this.sendAction("addGame");
            //that.transitionTo('cards.spades.games.game',resp.gameId);
        },
        gameView(){
            this.set("isGameView",true);
            this.set("isCreateView",false);
            this.set("isEnterGame",false);
            this.set("game",{});

        }
    }
});
