import Ember from 'ember';
let SockJS = window.SockJS;
let Stomp = window.Stomp;
let stompClient = null;
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    init(){

        var socket = new SockJS(ENV.APP.API_HOST+'/gs-guide-websocket');
        stompClient = Stomp.over(socket);
        console.log("I like chicken");
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
          

            //var g = null;

            // stompClient.subscribe('/topic/greetings', function (greeting) {
            //     //showGreeting(JSON.parse(greeting.body).content);
            //     let _then  = _that;
            //     console.log(greeting.body);
            //     db.changeMessage(JSON.parse(greeting.body));
            //     _then.refresh();

    
            
            // });
            


        });
    }
});
