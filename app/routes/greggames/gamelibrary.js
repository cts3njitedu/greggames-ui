import Ember from 'ember';
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    games: null,
    init() {
        var that = this;
        // Ember.$.getJSON(ENV.APP.API_HOST+"/greggames", function (data) {

        //     console.log(ENV.APP.API_HOST);
        //     data = data.map(v => v.toLowerCase());
        //     that.set("games",data);
        //     that.refresh();






        // });

        var request = Ember.$.ajax({
            method: 'GET',
            url: ENV.APP.API_HOST+"/greggames",
            dataType: "json",
            crossDomain:true,
           
           
            xhrFields: {
                withCredentials: true
            }
        });
        request.done(function (data) {
            console.log(ENV.APP.API_HOST);
            data = data.map(v => v.toLowerCase());
            that.set("games", data);
            that.refresh();

        });

    },
    model() {

        return this.get("games");
    }

});
