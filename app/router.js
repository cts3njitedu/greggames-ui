import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('greggames', function () {
    this.route('about');
    this.route('cards', function () {
      this.route('spades', function () {
        this.route('about');
        this.route('games', function () {
          this.route('game', { path: '/:gameId' }, function() {
            this.route('players', function() {
              this.route('player',{path: '/:playerId'});
            });
          });
        });
      });
    });
  });
  this.route('cards', function () {
    this.route('spades', function () {
      this.route('games', function () {
        this.route('game', { path: '/:gameId' });
      });
    });
  });
});

export default Router;
