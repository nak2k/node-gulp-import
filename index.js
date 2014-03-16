/*
 * The MIT License
 *
 * Copyright 2014-2014 Kengo Nakatsuka <kengo.nakatsuka@gmail.com>
 *
 */
var resolve = require('resolve');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var pkg = require('./package');

module.exports = function(glob, opt) {
  if (glob instanceof Array) {
    glob = glob.map(processGlob);
  } else {
    glob = processGlob(glob);
  }

  return this.src(glob, opt);
};

function processGlob(glob) {
  var index;
  if (!glob || (index = glob.indexOf('/')) < 0) {
    throw new PluginError(pkg.name, 'Invalid glob ' + glob);
  }

  var pkgName = glob.substring(0, index);
  var path = glob.substring(index);

  var pkgDir;
  try {
    resolve.sync(pkgName, {
      basedir: process.cwd(),
      packageFilter: function(pkg, dir) {
        pkgDir = dir;
        pkg.main = 'package.json';
        return pkg;
      }
    });
  } catch (e) {
    throw new PluginError(pkg.name, e);
  }

  return pkgDir + path;
}
