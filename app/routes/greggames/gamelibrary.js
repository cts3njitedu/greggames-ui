import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    games: null,
    init() {
        var that = this;
        Ember.$.getJSON(ENV.GREGSERVER, function (data) {

            data = data.map(v => v.toLowerCase());
            that.set("games",data);
            that.refresh();

       




        });

    },
    model() {

        return this.get("games");
    }

});
