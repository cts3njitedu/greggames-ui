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


    actions: {
        addGame() {

            let nG = Ember.copy(this.get("newGame"));
            //this.set("newGame",null);
            this.set("newGame",{});
            this.sendAction("addGame", nG);
        }
    }
});
