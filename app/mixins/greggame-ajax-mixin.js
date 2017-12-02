import Ember from 'ember';

export default Ember.Mixin.create({

    ajax: Ember.inject.service(),

    doGet: function(url){


            return this.get("ajax").request(url,{
                method: 'GET',
                //url: ENV.APP.API_HOST + "/cards/spades/games",
                dataType: "json",
               
                // error: function (reason) {
                //     reject(reason);
                // },
                // success: function(response){
                //     console.log(response);
                //     resolve(response);
                // }
            });
           
 

    }
});
