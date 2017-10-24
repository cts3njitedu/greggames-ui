import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('greggames', function() {
    this.route('gamelibrary', function() {});
    this.route('about');
    this.route('spades');
  });
});

export default Router;
