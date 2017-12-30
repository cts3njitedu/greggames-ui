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
    didRender() {

        console.log("we are one mu fried");
        // if(this.get("previousTrick")==null||this.get("previousTrick")==undefined){

            
        //     this.set("displayedCard",this.get("player.playingCard.name"));
        //     if(this.get("player.playingCard.name")==null){

        //         this.set("hasPlayingCard",false);
        //     }
        //     else{
        //         this.set("hasPLayingCard",true);
        //     }

        // }
        
        // if(this.get("previousTrick")==null){

        //     if(this.get("player.playingCard")==null){

        //         this.set("showSectionForCard",false);
        //     }
        //     this.set("displayedCard",this.get("player.playingCard.name"));
            
        // }
        // else{
        //     this.set("displayedCard",this.get("previousTrick"));
        // }
       
       
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

    showSectionForCard: true,

    displayedCard: Ember.computed("previousTrick","player.playingCard",function(){
     
        let previousPlayer = this.get("previousTrick.players");
          console.log("Entering displaying card")
 

            if(previousPlayer==null||previousPlayer==undefined){

                console.log("We are previous");
               
    
                return this.get("player.playingCard.name");
            
            }
            else{
    
                console.log("Previous trick");
                console.log(previousPlayer);
                console.log(this.get("player.name"));
    
                let playerData = previousPlayer[this.get("player.name")];
                
                console.log(playerData);
                let self = this;
                setTimeout(function(){


                    self.set("previousTrick",null);
                    self.set("player.playingCard",null);


                },1200)
    
        
                return playerData.playingCard.name;
            }

        
       

        


    }),

    hasPlayingCard: Ember.computed("previousTrick","player.playingCard",function(){
       

        return ((this.get("player.playingCard")!=null)||(this.get("previousTrick")!=null));
       
        
        // return (this.get("previousTrick")!=null)||(this.get("player.playingCard")!=null);
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
        //    if(this.get("player.name")!=this.get("playerView")){
        //        card = null;
        //        this.set("displayedCard",null);
        //    }

            
            
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
