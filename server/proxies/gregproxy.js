/* eslint-env node */
'use strict';

const proxyPath = '/api';

module.exports = function (app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  let httpProxy = require('http-proxy');
  let http = require('http');

  var proxy = httpProxy.createProxyServer({
    proxyTimeout: 0,
    timeout: 0,
    agent: new http.Agent(
      {
        keepAlive: true
      }
    )
  });
  
  
  proxy.on('error', function (err, req) {
    console.error(err, req.url);
    console.error("Time out happened");
  });

  proxy.on('close', function (err, req,res) {

    console.error("Socket closed!!!!!!!!!!!");
  });

  proxy.on('proxyReq', function (proxyReq, req, res) {
    console.log('RAW Response from the target');
    proxyReq.timeout=60000000;
    req.timeout=60000000;
    //console.log(proxyReq);
  });

  proxy.on('proxyReqWs',function(proxyReqWs,req,res){
    console.log("WEb socket reqquest")
    proxyReqWs.timeout=0;
    req.timeout=0;
    //console.log(proxyReqWs);
  });

  app.use(proxyPath, function (req, res, next) {
    // include root path in proxied request
    //req.url = proxyPath + '/' + req.url;'
    console.log("Proxing request");
    //console.log(req);
    console.log(req.url);
    req.timeout = 
    console.log(process.env.NPM_CONFIG_API_HOST);
    proxy.web(req, res, { 
      target: process.env.NPM_CONFIG_API_HOST,
      timeout: 0
    
    });
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
