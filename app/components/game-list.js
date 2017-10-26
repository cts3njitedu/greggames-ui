import Ember from 'ember';

export default Ember.Component.extend({

    newGame:null,


    actions:{
        addGame(){

            let nG = Ember.copy(this.get("newGame"));
            this.set("newGame","");
            this.sendAction("addGame",nG);
        }
    }
});
