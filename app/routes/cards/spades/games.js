import Ember from 'ember';
let SockJS = window.SockJS;
let Stomp = window.Stomp;
let stompClient = null;
import ENV from 'greggames-ui/config/environment';
export default Ember.Route.extend({

    data: null,
    init() {

        
    },
    changeData(content,that){

        that.set("data",content);
        that.refresh();
    },
    getGamesSocket(that){

        var socket = new SockJS(ENV.APP.API_HOST + '/ggsocket');
        stompClient = Stomp.over(socket);

        //let that = this;
        
        console.log(that);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/spades/1', function (greeting) {
                //showGreeting(JSON.parse(greeting.body).content);
        
                //console.log(greeting.body);
             
                that.get("changeData")(JSON.parse(greeting.body),that);
                
                //_then.refresh();



            });



        });

    },
    model() {

        let that=this;
        this.get("getGamesSocket")(that);
        return this.get("data");
    },
    actions: {

        test() {
            
            stompClient.send("/app/greggames/spades/1", {}, JSON.stringify({ 'name': "Please Work" }));
           




        }
    }
});
