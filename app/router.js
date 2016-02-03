import Ember from 'ember';
import config from './config/environment';
import ResetScrollMixin from 'ember-cli-reset-scroll';

const Router = Ember.Router.extend(ResetScrollMixin, {
  location: config.locationType,
  metrics: Ember.inject.service(),

  willTransition() {
    this._super(...arguments);
    window.scrollTo(0,0);
  },

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('openphoto', function() {});
  this.route('openphotos', function() {
    this.route('submit');
  });
  this.route('login');
  this.route('styleguide');
  this.route('submit');

  this.route('page', {
    path: '/page/:page_slug'
  });
  this.route('resources', function() {
    this.route('resource', {
      path: ':resource_slug'
    });
  });
  this.route('events', function() {
    this.route('event', {
      path: ':event_slug'
    });
  });
  this.route('picture-yourself-open', function() {
    this.route('submit');
  });
});

export default Router;
