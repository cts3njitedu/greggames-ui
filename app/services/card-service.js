import Ember from 'ember';

import CardMixin from '../mixins/card-mixin';
export default Ember.Service.extend(CardMixin,{

    gregWebSocket: Ember.inject.service("greg-websocket"),

    games: null,


    getInitialGames(other){

        var self = this;
        var games = this.getCardGames().then(function(games){
            console.log("sugar honey ice tea");
            Ember.set(self,"games",games);
            other.refresh();

        });

    }

});