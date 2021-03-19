const gulpRename = require('gulp-rename');
const gulp = require('gulp');

gulp.task('toScr', function() {
    return gulp.src(['build/**.exe'])
    .pipe(gulpRename(function (path) {
        path.extname = ".scr";
    }))
    .pipe(gulp.dest("build"));
});
