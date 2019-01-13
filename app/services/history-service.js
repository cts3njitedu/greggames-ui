import Ember from 'ember';

export default Ember.Service.extend({

    history: [],

    init(){
        this._super(...arguments);
        this.set('history',[]);
    },

    addUrl : function(url){

        this.get("history").pushObject(url);
    },

    getUrls: function(){
        return this.get("history");
    }
});
