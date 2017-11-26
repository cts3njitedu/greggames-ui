/* eslint-env node */
'use strict';

const proxyPath = '/api';

module.exports = function (app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  let httpProxy = require('http-proxy');
  let http = require('http');

  var proxy = httpProxy.createProxyServer({});

  proxy.on('error', function (err, req) {
    console.error(err, req.url);
  });

  proxy.on('proxyReq', function (proxyReq, req, res) {
    console.log('RAW Response from the target', req);
  });

  app.use(proxyPath, function (req, res, next) {
    // include root path in proxied request
    //req.url = proxyPath + '/' + req.url;'
    console.log("adkfja;dfj;asfj;sjf;sd");
    console.log(req.url);
    console.log(process.env.NPM_CONFIG_API_HOST);
    proxy.web(req, res, { target: process.env.NPM_CONFIG_API_HOST });
  });

  // proxy.on('proxyReq', function (proxyReq, req, res, options) {
  //   console.log("asdfkj;sfj;sdfj");
  //   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  // });

  // http.createServer(function (req, res) {
  //   // You can define here your custom logic to handle the request
  //   // and then proxy the request.
  //   proxy.web(req, res, {
  //     target: 'http://localhost:8081/'
  //   });
  // }).listen(9000);


  // proxy.on('error', function(err, req) {
  //   console.error(err, req.url);
  // });

  // http.createServer(function(req, res) {
  //   proxy.web(req, res, { target: 'http://locahost:8081' });
  // });
};
