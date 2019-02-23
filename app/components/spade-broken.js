import Ember from 'ember';

export default Ember.Component.extend({


    spadeBroken: Ember.computed("gameView.spadeBroken",function(){
        
        return this.get("gameView.spadeBroken");
    }),

    isSpadeBroken: Ember.computed("spadeBroken",function(){
        
        return this.get("spadeBroken")!=null;
    }),

    isFirstSpade: Ember.computed("spadeBroken.firstSpade",function(){

        return this.get("spadeBroken.firstSpade");
    })
});
