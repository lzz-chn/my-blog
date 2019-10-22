const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');

// eslint-disable-next-line @typescript-eslint/camelcase
// const { APP_ENV, npm_package_name } = process.env;
// const isProduct = APP_ENV === 'production';

// 需要上传到服务器的路径
const remotePath = '/src/';
// const remotePath = `/home/public/docker/main/${npm_package_name}`;

const config = {
    ssh: {
        host: '39.105.144.5',
        port: 4000,
        username: 'hobbs',
        password: 'sftp123456'
    },
    path: remotePath,
    commands: `rm -rf ${remotePath}` // 删除现有文件
};
const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config.ssh
});

/**
 * 上传前先删除服务器上现有文件...
 */
gulp.task('execSSH', done => {
    console.log('删除服务器上现有文件...');
    // return gulpSSH.shell(config.commands, { filePath: 'commands.log' }).pipe(gulp.dest('logs'));
    // gulpSSH.shell(config.commands, { filePath: 'commands.log' }).pipe(gulp.dest('logs'));
    gulpSSH.shell('rm /src', { filePath: 'commands.log' }).pipe(gulp.dest('logs'));
    // gulpSSH.shell(`${config.commands}index.html`);
    done();
});

/**
 * 上传文件到服务器
 */
gulp.task(
    'deploy',
    gulp.series('execSSH', done => {
        console.log('2s后开始上传文件到服务器...');
        // setTimeout(() => {
        //     gulp.src(['./dist/*']).pipe(gulpSSH.dest(config.path));
        //     gulp.src(['./dist/css/*']).pipe(gulpSSH.dest(config.path + 'css'));
        //     gulp.src(['./dist/fonts/*']).pipe(gulpSSH.dest(config.path + 'font'));
        //     gulp.src(['./dist/img/*']).pipe(gulpSSH.dest(config.path + 'img'));
        //     gulp.src(['./dist/js/*']).pipe(gulpSSH.dest(config.path + 'js'));
        //     console.log('上传完毕.....');
        //     done();
        // }, 2000);
        done();
    })
);
