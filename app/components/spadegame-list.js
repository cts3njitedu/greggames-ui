import Ember from 'ember';
import { task } from 'ember-concurrency';
export default Ember.Component.extend({

    showModal: false,
    isCreator: false,
    gameState: null,
    spadeService: Ember.inject.service("spade-service"),
    init() {

        this._super(...arguments);
        var self = this;

    },

    makeSubScrition() {



    },
    willDestroyElement() {
        // console.log("Destorying component....");
        // this.get("subscriber").unsubscribe();
    },
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
        createNewGame(newGame) {

            this.set("isCreator", true);
            this.sendAction("createNewGame", newGame);


        },
        routeToGame() {



        }
    }
});
