import Ember from 'ember';
import spadeService from '../../../../../../services/spade-service';

export default Ember.Route.extend({

  
    model(params){


        console.log("What is going on");
        console.log(params);
        return this.modelFor("greggames.cards.spades.games.game");
    },
    actions: {

       
    }
});
