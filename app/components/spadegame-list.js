import Ember from 'ember';

export default Ember.Component.extend({

    showModal: false,


    actions: {

        playGame(gameId) {

            console.log("this was called");
            this.sendAction("playGame", gameId);

        },

        createGame() {
            console.log("sugar Honey ice tea");
            console.log(this.get("showModal"));
            this.set("showModal", true);
            console.log(this.get("showModal"));
        },
        cancelGame() {

            this.set("showModal", false);
        },
        createNewGame(newGame){
            this.sendAction("createNewGame",newGame);

        }
    }
});
