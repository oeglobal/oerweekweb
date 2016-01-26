import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('openphoto', function() {});
  this.route('openphotos', function() {
    this.route('submit');
  });
  this.route('login');
});

export default Router;
