/*
 * The MIT License
 *
 * Copyright 2014-2014 Kengo Nakatsuka <kengo.nakatsuka@gmail.com>
 *
 */
var path = require('path');
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
  var pkgPath = glob.substring(index);

  var pkgDir;
  try {
    pkgDir = path.dirname(require.resolve(pkgName + '/package.json'));
  } catch (e) {
    throw new PluginError(pkg.name, e);
  }

  return pkgDir + pkgPath;
}
