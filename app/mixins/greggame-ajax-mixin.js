import Ember from 'ember';

export default Ember.Mixin.create({


    doGet: function(url){

        return new Ember.RSVP.Promise(function (resolve, reject) {
            // call 'resolve' with the value if the operation is successful
            // call 'reject' with the error reason if the operation is unsuccessful
            var request = Ember.$.ajax({
                method: 'GET',
                //url: ENV.APP.API_HOST + "/cards/spades/games",
                url: url,
                dataType: "json",
               
                error: function (reason) {
                    reject(reason);
                },
                success: function(response){
                    console.log(response);
                    resolve(response);
                }
            });
           
        });

    }
});
