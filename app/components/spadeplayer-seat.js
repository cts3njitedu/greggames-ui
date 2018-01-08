import Ember from 'ember';
import SpadeConstants from '../utils/spade-constants';
export default Ember.Component.extend({


    isShowScore: false,

    isPlayAgainView: false,

    isWonTrick: Ember.computed("player.won",function(){

        return this.get("player.won")&&(this.get("previousTrick")!=null);


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

    displayedCard: Ember.computed("previousTrick", "player.playingCard", function () {

        let previousPlayer = this.get("previousTrick.players");
        console.log("Entering displaying card")

        if (this.get("isTrickOver")) {

            console.log("Previous trick");
            console.log("as;dfj;asfjijw;elfkjle");

            let playerData = previousPlayer[this.get("player.name")];


            let self = this;

            console.log("In here like spinware");

            setTimeout(function () {


                self.set("previousTrick", null);
                self.set("player.playingCard", null);
                self.set("player.won",false);

                if (self.get("isShowPlayerCards") && !self.get("isGameView")) {

                    let _self = self;
                    console.log("Sugar Baby");
                    if (self.get("isHandOver")) {

                        _self.set("isShowScore", true);
                        setTimeout(function () {

                            if (_self.get("isGameOver")) {

                                _self.set("isShowPlayerCards", false);
                                let __self = _self;
                                _self.set("isPlayAgainView", true);
                                // setTimeout(function(){
                                //    __self.set("isPlayAgainView",false);

                                //    if(__self.get("player.name") == __self.get("playerView")){
                                //     __self.set("isShowPlayerCards",true);
                                //    }


                                // },5000)
                            }

                            _self.set("isShowScore", false);
                            _self.set("previousHand", null);




                        }, 5000)


                    }

                }





            }, 1200)


            return playerData.playingCard.name;

        }

        else {

            console.log("We are previous");


            return this.get("player.playingCard.name");

        }







    }),

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
