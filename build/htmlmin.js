(function () {
  'use strict';

  var path = require('path');
  var fs = require('fs');

  var minify = require('html-minifier').minify;
  var glob = require('glob');
  var mkdirp = require('mkdirp');

  var src = 'app/**/*.html';
  var minifyOptions = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseBooleanAttributes: true,
    removeCommentsFromCDATA: true
  };

  glob(src, function (err, files) {
    if (err) console.error(err);
    files.forEach(readFile);
  });

  function readFile(file) {
    fs.readFile(file, 'utf8', function (err, html) {
      if (err) console.error(err);

      var squished = minify(html, minifyOptions);
      writeFile(squished, file);
    });
  }

  function writeFile(squished, filename) {
    var dir = path.dirname(filename).replace('app', 'dist');
    filename = filename.replace('app', 'dist');
    mkdirp(dir, function (err) {
      if (err) console.error(err);
      fs.writeFile(filename, squished, function (err) {
        if (err) console.error(err);
      });
    });
  }

})();
