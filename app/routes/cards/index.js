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
            method: "GET",
           //url: ENV.APP.API_HOST+"/greggames/cards",
            url: "https://greggames.herokuapp.com/gregproxy/greggames/cards",
            dataType: "json",
       
            //crossDomain:true,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            },
            success: function(data,textStatus,XMLHttpRequest){

                console.log(ENV.APP.API_HOST);
                console.log(data);
                data = data.map(v => v.toLowerCase());
                that.set("games", data);
                that.refresh();

            }
        });
        // request.done(function (data) {
           

        // });

    },
    model() {

        return this.get("games");
    }
});
