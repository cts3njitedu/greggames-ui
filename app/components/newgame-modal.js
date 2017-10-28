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
            this.set("isGameView",true);
            this.set("isCreateView",false);
            this.sendAction("addGame");
        }
    }
});
