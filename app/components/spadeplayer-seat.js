import Ember from 'ember';

export default Ember.Component.extend({


    didInsertElement() {



        console.log("You the best");

        let playerCards = this.$("#playerCards");

        let cards = this.get("player.remainingCards");
        console.log(this.element);
        let div = this.element;
        for (let card = 0; card < cards.length; card++) {

        
            let img = document.createElement('img');

            img.className = "cardSize";


            img.id = this.get("player.name") + card;
            div.appendChild(img);

            Ember.$("#" + img.id).css({
                "left": (5 * card) + "%", "position": "absolute", "z-index": card, "margin-left":"15%"

            });


            img.setAttribute("src", "/assets/images/cards/CardBack.jpg");


        }


    }

});
