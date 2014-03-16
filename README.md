# gulp-import

## Usage

`gulp-import` exports a method for the [gulp](https://github.com/gulpjs/gulp).

```javascript
var gulp = require('gulp');
gulp.import = require('gulp-import');
```

### gulp.import(globs[, options])

`globs` and `options` are equal to arguments of [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options),
except a first path segment of a glob means a package name.

## Example

In your `gulpfile.js`:

```javascript
var gulp = require('gulp');
gulp.import = require('gulp-import');

gulp.task('default', function() {
  gulp.import('twitter-bootstrap/img/*')
    .pipe(gulp.dest(__dirname + '/public/img'))
});
```

```
$ npm install gulp gulp-import --save-dev
$ npm install twitter-bootstrap --save
$ gulp
```

## License

MIT
