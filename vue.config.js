module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    pluginOptions: {
        ssh: {
            projectName: 'my-blog',
            host: '39.105.144.5',
            port: 4000,
            username: 'hobbs',
            password: 'sftp123456',
            remotePath: '/src/',
            localPath: 'dist'
        }
    }
};
