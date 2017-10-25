import Ember from 'ember';
let SockJS = window.SockJS;
let Stomp = window.Stomp;
let stompClient = null;
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    data: null,
    init() {

        var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            let that = this;

            stompClient.subscribe('/topic/spades', function (greeting) {
                //showGreeting(JSON.parse(greeting.body).content);
                let _then = that;
                console.log(greeting.body);
                this.set("data", JSON.parse(greeting.body));
                _then.refresh();



            });



        });
    },
    model() {

        return this.get("data");
    },
    actions: {

        test() {
            
            stompClient.send("/app/greggames/spades", {}, JSON.stringify({ 'name': "Please Work" }));
           




        }
    }
});
