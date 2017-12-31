import Ember from 'ember';

export default Ember.Component.extend({


    init() {

        this._super();
        // if(this.get("previousTrick")==null){

        //     if(this.get("player.playingCard")==null){

        //         this.set("showSectionForCard",false);
        //     }
        //     this.set("displayedCard",this.get("player.playingCard.name"));

        // }
        // else{
        //     this.set("displayedCard",this.get("previousTrick"));
        // }

    },

    isShowPlayerCards: Ember.computed("playerView", "player.name", function () {

        return this.get("player.name") == this.get("playerView");
    }),

    showSectionForCard: true,

    displayedCard: Ember.computed("previousTrick", "player.playingCard", function () {

        let previousPlayer = this.get("previousTrick.players");
        console.log("Entering displaying card")


        if (previousPlayer == null || previousPlayer == undefined) {

            console.log("We are previous");
         

            return this.get("player.playingCard.name");

        }
        else {

            console.log("Previous trick");
          

            let playerData = previousPlayer[this.get("player.name")];

         
            let self = this;
            setTimeout(function () {


                self.set("previousTrick", null);
                self.set("player.playingCard", null);


            }, 1200)


            return playerData.playingCard.name;
        }







    }),

    isPlayerTurn: Ember.computed("currTurn","player.name",function(){

        console.log("This is deciding player turn");
        console.log(this.get("currTurn"))
        return this.get("currTurn")==this.get("player.name");

    }),
    hasPlayingCard: Ember.computed("previousTrick", "player.playingCard", function () {

        return ((this.get("player.playingCard") != null) || (this.get("previousTrick") != null));


        // return (this.get("previousTrick")!=null)||(this.get("player.playingCard")!=null);
    }),
    actions: {

        playerCard(card) {


            console.log("Playing Card");
            console.log(card);
            console.log(this.get("currTurn"));
          

            let cardDetails = {

                card: card,
                player: this.get("player")
            }
            this.sendAction("playerCard", cardDetails);

            
            

        }
    }
    

});
