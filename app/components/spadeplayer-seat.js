import Ember from 'ember';

export default Ember.Component.extend({


    init() {

        this._super();

    },
    didRender() {

        console.log("we are one mu fried");
        let div = this.element;

        $("#" + div.id).children("img").each(function (i) {



            let index = this.id.split("_")[1];
            Ember.$("#" + this.id).css({
                "left": (5 * index) + "%", "z-index": index


            }


            )
            Ember.$("#" + this.id).addClass("cardSize");
            Ember.$("#" + this.id).addClass("cardDetails");

        })
    },
    isShowPlayerCards: Ember.computed("playerView", "player.name", function () {

        return this.get("player.name") == this.get("playerView");
    }),

    hasPlayingCard: Ember.computed("player",function(){

        return (this.get("player.playingCard")!=null);
    }),
    actions: {

        playerCard(card) {


            console.log("Playing Card");
            console.log(card);
            console.log(this.get("currTurn"));
            // if (this.get("currTurn") != this.get("playerView")) {

            //     alert("It is not your turn!!!!");
            // }
            // else {
            //     this.sendAction("playerCard", card);

            // }
            this.sendAction("playerCard", card);

        }
    }
    // didRender() {



    //     console.log("You the best");



    //     let cards = this.get("player.remainingCards");
    //     console.log("This is player seat");
    //     console.log(cards);
    //     console.log(this.element);
    //     let div = this.element;
    //     for (let card = 0; card < cards.length; card++) {


    //         let img = document.createElement('img');

    //         img.className = "cardSize";

    //         console.log("adkfj;asldfj");
    //         console.log(img.id);
    //         //img.id = this.get("player.name") + card;
    //         //div.appendChild(img);

    //         Ember.$("#" + img.id).css({
    //             "left": (5 * card) + "%", "position": "absolute", "z-index": card, "margin-left":"15%"

    //         });


    //         // img.setAttribute("src", "/assets/images/cards/BACK_CARD.jpeg");


    //     }


    // }

});
