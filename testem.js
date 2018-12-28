var path  = require('path');
var http  = require('http');
var fs    = require('fs');
var shell = require('shelljs');
var port  = 7358;
var server;

module.exports = {
  framework: 'mocha',
  launch_in_ci: ['Chrome', 'Firefox'],
  src_files: ['dist/tests/*.js'],
  browser_args: {
    Chrome: [
      '--disable-gpu',
      '--headless',
      '--remote-debugging-port=0',
      '--window-size=1440,900'
    ],
    Firefox: [
      '-headless',
      '--window-size=1440,900'
    ]
  },

  // proxy to the create http server
  // phantomjs has problems with POSTs to different port
  proxies: {
    '/coverage': {
      target: 'http://localhost:7358'
    }
  },

  before_tests: function(config, data, callback) {
    server = http.createServer(function(req, res) {
      console.error('[coverage] Received coverage of', req.headers['content-length'], 'length');
      // need separate files per browser/client
      req.pipe(fs.createWriteStream(path.join(__dirname, 'coverage-' + Math.random() + '.json')));
      // make sure we've got it all
      req.on('end', res.end.bind(res));
    }).listen(port, function(serverErr) {
      console.error('[coverage] Listening for coverage on ' + port);
      // when server is ready
      // pass control back to testem
      callback(serverErr);
    });
  }
};
