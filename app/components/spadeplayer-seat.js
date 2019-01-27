import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants';
export default Ember.Component.extend({


    isShowScore: false,

    init(){

        this._super(...arguments);
        console.log("CurrentTime spade player");
        console.log(this.get("maxTime"));
    },

    allowClick: Ember.computed("isPlayerTurn",function(){
        
        return this.get("isPlayerTurn");
    }),

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



        console.log("Initializating Player Seat");
        Ember.run.schedule("afterRender",this,function(){

            this.send("handleDisplayedCard");
        })

    },
    // didRender(){
       
       
    
    //     if(this.get("isTrickOver")){

    //         this.handleDisplayedCard();
    //     }
    //     else{
    //         this.set("displayedCard",this.get("player.playingCard.name"));
      
    //     }
        
            
        
        

    // },
    



    trickOverHandler() {

        let self = this;
        setTimeout(function () {
            console.log("Trick is over");

            self.set("previousTrick", null);
            self.set("isWonTrick",false);
            self.set("isTrickOver",false);

        }, 2000)



    },
    handOverHandler() {

        if (this.get("player.name") == this.get("playerView")) {

            let self = this;

            this.set("isShowScore", true);
            setTimeout(function () {


                self.set("previousHand",null);
                self.set("isHandOver",false);
                   

            }, 10000)




        }
        else{
            return;
        }


    },

    gameOverHander() {

        this.set("isShowScore",false);
  
        this.set("isPlayAgainView", true);
        this.set("isShowPlayerCards", false);
        this.set("isGameOver",false);
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

    // willDestroyElement(){

    //     console.log("Destroyed element "+this.get("player").name);
    // },
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
        leaveGame(player){
            
            console.log("I am leaving the game " + player);
            this.set("isPlayAgainView", false);
            this.set("isShowPlayerCards", false);
            this.sendAction("leaveGame",player);
        },
        createPlayerView(player) {
            console.log("Seat Player metadata");
            this.set("isPlayAgainView", false);
            this.set("isShowPlayerCards", true);
            this.sendAction("createPlayerView", player);
        },
        handleDisplayedCard(){

            console.log("Handle Displaying Card");
            if (this.get("isTrickOver")) {
    
               console.log("Tricking");
                let previousPlayer = this.get("previousTrick.players");
       
                let playerData = previousPlayer[this.get("player.name")];
                if(playerData.won){
                    this.set("isWonTrick",true);
                }
                this.set("displayedCard", playerData.playingCard.name);
                this.trickOverHandler();
    
    
    
            }
            else if(this.get("isHandOver")&&!this.get("isTrickOver")){

                this.handOverHandler();
            }
            else if(this.get("isGameOver")&&!this.get("isHandOver")&&!this.get("isTrickOver")){

                this.gameOverHander();
            }
            else{
                this.set("displayedCard",this.get("player.playingCard.name"));
                
            }
    
    
    
        },
        willTransition(transition){
            console.log("Leaving Page....yeajdfkajfs;ij");
        }
    }


});
