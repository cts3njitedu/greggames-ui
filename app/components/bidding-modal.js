import Ember from 'ember';

export default Ember.Component.extend({

  counter: Ember.computed(function() {
    let counter = [];
    
    for (let i = 0; i <= 13; i++) {
      counter.push(i); 
    }
    
    return counter;
  }),

  isBidding: Ember.computed("gameView",function(){

    console.log(this.get("gameView.playerView"));

    return (this.get("gameView.playerView")==this.get("gameView.currTurn")) &&(this.get("gameView.bidding"));

  }),

  actions: {


    playerBid(bid){
        console.log("Player Bid");
        console.log(bid);

        this.sendAction("playerBid",bid);

    }
  }
});