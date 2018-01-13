import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants';
export default Ember.Component.extend({


    isShowScore: false,

    isPlayAgainView: Ember.computed("previousHand","player.userId",function(){


        return this.get("player.userId")==null&&this.get("previousHand")==null;


    }),

    isWonTrick: Ember.computed("player.won", function () {

        return this.get("player.won") && (this.get("previousTrick") != null);


    }),
    isShowPlayerCards: Ember.computed("playerView", "player.name", function () {

        return this.get("player.name") == this.get("playerView");
    }),

    isSentNewPlayerNotification: false,
    isShowPlayerCardsWhenOver: Ember.computed("playerView", "player.name", function () {

        return this.get("player.name") == this.get("playerView");
    }),

    showSectionForCard: true,

    isGameView: Ember.computed("playerView", function () {

        return this.get("playerView") == null;
    }),

    isBot: Ember.computed("player.bot", function () {

        return this.get("player.bot");


    }),
    playerAction: Ember.computed("gameNotification", function () {

        console.log("Bottles bottles bottles");
        if (this.get("gameNotification") == SpadeConstants.GAME_STATES.PLAY) {

            return SpadeConstants.GAME_STATES.PLAY;
        }
        else {
            return SpadeConstants.GAME_STATES.BID;
        }


    }),

    playerCards: Ember.computed("player.remainingCards.@each", function () {

        let hearts = this.get("player.remainingCards").filter(function (card, index, enumerable) {

            return card.suit == SpadeConstants.SUITS.HEARTS;
        });
        hearts.sort(function (a, b) {

            return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        })
        let diamonds = this.get("player.remainingCards").filter(function (card, index, enumerable) {

            return card.suit == SpadeConstants.SUITS.DIAMONDS;
        });
        diamonds.sort(function (a, b) {

            return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        })
        let clubs = this.get("player.remainingCards").filter(function (card, index, enumerable) {

            return card.suit == SpadeConstants.SUITS.CLUBS;
        });
        clubs.sort(function (a, b) {

            return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        })
        let spades = this.get("player.remainingCards").filter(function (card, index, enumerable) {

            return card.suit == SpadeConstants.SUITS.SPADES;
        });
        spades.sort(function (a, b) {

            return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        })

        let cardsToPlay = diamonds.concat(clubs).concat(hearts).concat(spades);

        return cardsToPlay;
    }),

    playerBid: Ember.computed("player.bidNil", "player.playerCurrentScore", function () {

        if (this.get("player.bidNil")) {

            return "BID NIL";
        }
        else {
            return this.get("player.playerBid");
        }

    }),

    didRender(){
       
       
    
        if(this.get("isTrickOver")){

            this.handleDisplayedCard();
        }
        else{
            this.set("displayedCard",this.get("player.playingCard.name"));
      
        }
        
            
        
        

    },
    handleDisplayedCard: function(){

        console.log("Handle Displaying Card");
        if (this.get("isTrickOver")) {

            let previousPlayer = this.get("previousTrick.players");
   
            let playerData = previousPlayer[this.get("player.name")];
            this.set("displayedCard", playerData.playingCard.name);
            this.trickOverHandler();



        }



    },



    trickOverHandler() {

        let self = this;
        setTimeout(function () {


            self.set("previousTrick", null);
         
            self.set("isShowScore", true);
            self.set("isTrickOver",false);
            
            if (self.get("isHandOver")) {

                self.handOverHandler();
            }



        }, 1200)



    },
    handOverHandler() {

        if (this.get("player.name") == this.get("playerView")) {

            let self = this;


            setTimeout(function () {


                    
                    self.set("isShowScore",false);
                    self.set("previousHand",null);
                    self.set("isHandOver",false);
                    if(self.get("isGameOver")){

                        
                        self.gameOverHander();

                    }
                   

            }, 5000)




        }


    },

    gameOverHander() {
        this.set("isPlayAgainView", true);
        this.set("isShowPlayerCards", false);
        let self = this;
        // setTimeout(function () {
        //     self.set("isPlayAgainView", false);
        //     self.set("isGameOver",false);
        //     if (self.get("player.name") == self.get("playerView")) {
        //         self.set("isShowPlayerCards", true);
        //     }


        // }, 5000)

    },
    isPlayerTurn: Ember.computed("currTurn", "player.name", function () {

        return this.get("currTurn") == this.get("player.name");

    }),
    hasPlayingCard: Ember.computed("previousTrick", "player.playingCard", function () {


        let isShow = (this.get("player.playingCard") != null)
            || (this.get("previousTrick") != null)
        return (isShow);


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




        },
        createPlayerView(player) {
            console.log("Seat Player metadata");
            this.set("isPlayAgainView", false);
            this.set("isShowPlayerCards", true);
            this.sendAction("createPlayerView", player);
        }
    }


});
