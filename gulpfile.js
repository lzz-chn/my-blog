const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');

// eslint-disable-next-line @typescript-eslint/camelcase
const { APP_ENV, npm_package_name } = process.env;
const isProduct = APP_ENV === 'production';

// 需要上传到服务器的路径
// eslint-disable-next-line @typescript-eslint/camelcase
// D:\前端练习代码\my-blog-backstage\src
// const remotePath = `/src/${npm_package_name}`;
const remotePath = `/src/`;
// const remotePath = `/home/public/docker/main/${npm_package_name}`;
const config = {
    ssh: {
        // 测试
        host: '127.0.0.1',
        port: 3000,
        username: '',
        password: ''
        // 正式
        // host:  '39.105.144.5',
        // port:  3000,
        // username: 'Administrator',
        // password: 'Lzz1043784500'
        // // 正式
        // host: isProduct ? '' : '39.105.144.5',
        // port: isProduct ? 22 : 3000,
        // username: 'root',
        // password: isProduct ? '' : 'a1234567'
    },
    remotePath,
    commands: [
        // 删除现有文件
        `rm -rf ${remotePath}`
    ]
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
    gulpSSH.shell(config.commands, { filePath: 'commands.log' }).pipe(gulp.dest('logs'));
    done();
});

/**
 * 上传文件到服务器
 */
gulp.task(
    'deploy',
    gulp.series('execSSH', done => {
        console.log('2s后开始上传文件到服务器...');
        setTimeout(() => {
            gulp.src(`./${npm_package_name}/**`).pipe(gulpSSH.dest(config.remotePath));
            console.log('上传完毕.....');
            done();
        }, 2000);
    })
);
