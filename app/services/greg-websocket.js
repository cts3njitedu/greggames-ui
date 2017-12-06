import Ember from 'ember';


let SockJS = window.SockJS;
let Stomp = window.Stomp;
import ENV from 'greggames-ui/config/environment';
export default Ember.Service.extend({


    client: null,


    connect: function (cb) {


        if (this.get("client")) {
            cb(this.get("client"));
        }
        else {

            let self = this;
            var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
            var stompClient = Stomp.over(socket);

            stompClient.connect({}, function (frame) {
                self.set("client",stompClient);
                //console.log('Connected: ' + frame);
                cb(stompClient);
            });

        }







    }
});
