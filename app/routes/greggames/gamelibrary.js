import Ember from 'ember';

export default Ember.Route.extend({

    games: null,
    init() {
        var that = this;
        Ember.$.getJSON("http://localhost:8080/greggames", function (data) {

            data = data.map(v => v.toLowerCase());
            that.set("games",data);
            that.refresh();

       




        });

    },
    model() {

        return this.get("games");
    }

});
