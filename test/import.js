var gulp = require('gulp');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
gulp.import = require('../');
var should = require('should');

describe('import()', function() {
  it('should import files from a specified package', function(done) {
    gulp.import('twitter-bootstrap/img/*')
      .pipe(gulp.dest(__dirname + '/tmp'))
      .on('end', done);
  });

  it('should throw a PluginError if not given glob', function(done) {
    try {
      gulp.import();
    } catch(e) {
      e.should.be.an.instanceof(PluginError);
      done();
    }
  });

  it('should throw a PluginError if given glob without a separator', function(done) {
    try {
      gulp.import('no-separator');
    } catch(e) {
      e.should.be.an.instanceof(PluginError);
      done();
    }
  });

  it('should throw a PluginError if invalid package', function(done) {
    try {
      gulp.import('invalid-pkgname/path');
    } catch(e) {
      e.should.be.an.instanceof(PluginError);
      done();
    }
  });
});
