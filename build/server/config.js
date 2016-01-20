// Generated by CoffeeScript 1.9.3
var americano, compression, fs, path, useBuildView, viewsDir;

fs = require('fs');

path = require('path');

americano = require('americano');

compression = require('compression');

viewsDir = path.resolve(__dirname, 'views');

useBuildView = fs.existsSync(path.resolve(viewsDir, 'index.js'));

module.exports = {
  common: {
    use: [
      compression(), americano["static"](path.resolve(__dirname, '../client/public'), {
        maxAge: 86400000
      }), americano.bodyParser({
        limit: '1mb',
        keepExtensions: true
      }), require('./helpers/shortcut')
    ],
    afterStart: function(app, server) {
      app.use(function(req, res) {
        return res.end();
      });
      return app.use(americano.errorHandler({
        dumpExceptions: true,
        showStack: true
      }));
    },
    set: {
      'view engine': useBuildView ? 'js' : 'jade',
      'views': viewsDir
    },
    engine: {
      js: function(path, locales, callback) {
        return callback(null, require(path)(locales));
      }
    }
  },
  development: [americano.logger('dev')],
  production: [americano.logger('short')],
  plugins: ['cozydb']
};
