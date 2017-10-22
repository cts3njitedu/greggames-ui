import Ember from 'ember';

export default Ember.Component.extend({

    greggames: null,
    // setupFunc: function(){

    //     let gg = this.get("greggames");
    //     let content = "<table>"
    //     //for(i=0; i)
       
    //     Ember.$.each(gg,function(value){



    //     })


    // }.on('didRender')

    actions: {

        routeToGame(gg){
            console.log(gg);

        }

    }
});
