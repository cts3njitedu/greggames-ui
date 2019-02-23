import Ember from 'ember';


// let SockJS = window.SockJS;
// let Stomp = window.Stomp;
import ENV from 'greggames-ui/config/environment';
import SockJS from 'npm:sockjs-client';
import Stomp from 'npm:stompjs';
export default Ember.Service.extend({


    client: null,


    connect: function (cb) {


        // if (this.get("client")!=null && this.get("client").connected) {
        //     console.log("Web socket connection");
        //     console.log(this.get("client"));
        //     if(!this.get("client").connected){
        //         let self = this;
        //         var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        //         var stompClient = Stomp.over(socket);

        //         stompClient.connect({}, function (frame) {
        //             self.set("client",stompClient);
        //             console.log("Websocket connection dolce: ")
        //             cb(stompClient);
        //         });
        //     }
        //     else{
        //         cb(this.get("client"));
        //     }
            
        // }
        // else {

            let self = this;
            var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
          
            var stompClient = Stomp.over(socket);

          
            stompClient.maxWebSocketFrameSize=200*1024*1024;




            stompClient.connect({}, function (frame) {
                self.set("client",stompClient);
                console.log("Websocket connection dolce: ");
                // console.log(frame);
                // stompClient.ws.onclose(function(message){

                //     console.log("Closing the connection");
                // });
                cb(stompClient);

            });

            console.log(stompClient);
            
    
        // }







    }
});
