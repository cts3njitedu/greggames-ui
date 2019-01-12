import Ember from 'ember';

export default Ember.Component.extend({


    didRender(){



        console.log("Initializating Player Seat");
        Ember.run.schedule("afterRender",this,function(){

            this.send("handleDisplayedCard");
        })

    },

    actions: {

        spadeBroken(){

            this.set("isFirstSpade",this.get("spadeBroken.isFirstSpade"));
            let self = this;
            setTimeout(function () {


                self.set("isFirstSpade",false);
                   

            }, 3000)

        }

    }
});
