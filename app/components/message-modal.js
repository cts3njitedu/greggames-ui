import Ember from 'ember';

export default Ember.Component.extend({


    init(){

        this._super(...arguments);
        console.log("Message Modal");
        console.log(this.get("player.serverMessages"));

    },
    messages: Ember.computed("player.serverMessages",function(){
        let msgs = this.get("player.serverMessages");
        console.log(msgs);
        let msgArray = [];
        for(var msg in msgs){

            if(msgs.hasOwnProperty(msg)){
                msgArray.push(msgs[msg]);
            }
        }

        return msgArray;
    })
});
