/* eslint-env node */
'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'greggames-ui',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created

      API_HOST: 'https://greggames-app.herokuapp.com'
    }

  };

  if (ENV.environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = "http://localhost:8081";
    ENV.contentSecurityPolicy = {
      'default-src': "'self' 'unsafe-inline'",
      'script-src': "'self' *",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:8081 ws://localhost:8081",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (ENV.environment === 'production') {
    console.log("in prod");
    ENV.APP.API_HOST = "https://greggames-app.herokuapp.com";
    ENV.contentSecurityPolicy = {
      'default-src': "'self' 'unsafe-inline'",
      'script-src': "'self' *",
      'font-src': "'self'",
      'connect-src': "'self' https://greggames-app.herokuapp.com ws://greggames-app.herokuapp.com",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  }

  return ENV;
};
