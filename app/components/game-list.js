import Ember from 'ember';

export default Ember.Component.extend({



    newGame:{

        pointsToWin: null,
        bags: null,
        overBook: null,
        bidNil: null,
        numberOfPlayers: 1,
        
    },


    isGameView: true,
    isCreateView: false,
    isEnterGame: false,


    actions: {
        addGame() {

            let nG = Ember.copy(this.get("newGame"));
            //this.set("newGame",null);
            this.set("newGame",{numberOfPlayers:1});
            this.sendAction("addGame", nG);
         
        }
    }
});
