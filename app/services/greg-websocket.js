import Ember from 'ember';


let SockJS = window.SockJS;
let Stomp = window.Stomp;
import ENV from 'greggames-ui/config/environment';
export default Ember.Service.extend({


    stompClient: null,


    connect: function(cb){

        

        var that = this;
        var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        var stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            cb(stompClient);
        });


        



    }
});
