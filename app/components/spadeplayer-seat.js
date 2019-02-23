import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants';
import GreggamesUtil from '../utils/greggames-util';
export default Ember.Component.extend({


    isShowScore: false,
    init(){

        this._super(...arguments);
        console.log("We adksfjklsdjf");
        console.log("CurrentTime spade player");
    },

    allowClick: Ember.computed("isPlayerTurn",function(){
        
        return this.get("isPlayerTurn");
    }),
    playerView: Ember.computed("gameView.playerView",function(){
        if(this.get("isGameView")){
            return null;
        }
        return this.get("gameView.playerView")
    }),
    player: Ember.computed("gameView",function(){
        console.log("Player: "+ this.get("position"));
        console.log(this.get("gameView.seats"));
        console.log(this.get("playerView"))
        return this.get("gameView.seats")[this.get("position")];

    }),
    isStarting: Ember.computed("gameView.gameNotification",function(){

        return this.get("gameView.gameNotification")==SpadeConstants.GAME_STATES.START;
    }),

    isPlayAgainView: Ember.computed("gameView.previousHand","player.userId",function(){

        console.log("What is going on tonight");
        return this.get("player.userId")==null&&this.get("gameView.previousHand")==null;

    }),

    isWonTrick: Ember.computed("player.won", function () {

        return this.get("player.won") && (this.get("gameView.previousTrick") != null);


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
    playerAction: Ember.computed("gameView.gameNotification", function () {

        if (this.get("gameView.gameNotification") == SpadeConstants.GAME_STATES.PLAY) {

            return SpadeConstants.GAME_STATES.PLAY;
        }
        else {
            return SpadeConstants.GAME_STATES.BID;
        }


    }),

    playerCards: Ember.computed("player.remainingCards", function () {
        console.log(this.isDestroyed+ " : " +this.isDestroying + " : "+this.get("isGameView"));
        // if(this.get("player")!=null){
        //     let hearts = this.get("player.remainingCards").filter(function (card, index, enumerable) {

        //         return card.suit == SpadeConstants.SUITS.HEARTS;
        //     });
        //     hearts.sort(function (a, b) {
    
        //         return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        //     })
        //     let diamonds = this.get("player.remainingCards").filter(function (card, index, enumerable) {
    
        //         return card.suit == SpadeConstants.SUITS.DIAMONDS;
        //     });
        //     diamonds.sort(function (a, b) {
    
        //         return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        //     })
        //     let clubs = this.get("player.remainingCards").filter(function (card, index, enumerable) {
    
        //         return card.suit == SpadeConstants.SUITS.CLUBS;
        //     });
        //     clubs.sort(function (a, b) {
    
        //         return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        //     })
        //     let spades = this.get("player.remainingCards").filter(function (card, index, enumerable) {
    
        //         return card.suit == SpadeConstants.SUITS.SPADES;
        //     });
        //     spades.sort(function (a, b) {
    
        //         return SpadeConstants.CARD_NUM_VALUE[a.value] - SpadeConstants.CARD_NUM_VALUE[b.value];
        //     })
    
        //     let cardsToPlay = diamonds.concat(clubs).concat(hearts).concat(spades);
        //     return cardsToPlay;
        // }
       

        return this.get("player.remainingCards");
    }),

    playerBid: Ember.computed("player.bidNil", "player.playerCurrentScore", function () {

        if (this.get("player.bidNil")) {

            return "BID NIL";
        }
        else {
            return this.get("player.playerBid");
        }

    }),

    isPlayerTurn: Ember.computed("gameView.currTurn", "player.name", function () {

        return this.get("gameView.currTurn") == this.get("player.name");

    }),
    hasPlayingCard: Ember.computed("gameView.previousTrick", "player.playingCard", function () {
        let isPlayingCardAvailble = true;
        let playingCard = this.get("player.playingCard");
        
        if(playingCard==null){
            isPlayingCardAvailble = false
        }
        else{
            for(let x in playingCard){
                if(playingCard[x]==null){
                    isPlayingCardAvailble = false;
                }
            }
        }
        console.log("Playing Card: "+ isPlayingCardAvailble);

        let isShow = (isPlayingCardAvailble)
            || (this.get("gameView.previousTrick") != null)
        return (isShow);
    }),
    displayedCard: Ember.computed("player.playingCard.name",function(){
        return this.get("player.playingCard.name");
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
        leaveGame(player){
            
            console.log("I am leaving the game " + player);
            this.sendAction("leaveGame",player);
        },
        createPlayerView(player) {
            console.log("Seat Player metadata");
            this.set("isPlayAgainView", false);
            //this.set("isShowPlayerCards", true);
            this.sendAction("createPlayerView", player);
        },
        handleDisplayedCard(){

            console.log("Handle Displaying Card");
            console.log(this.get("player.playingCard.name"));
            this.set("displayedCard",this.get("player.playingCard.name"));
                
            
    
    
    
        },
        willTransition(transition){
            console.log("Leaving Page....yeajdfkajfs;ij");
        }
    }


});
