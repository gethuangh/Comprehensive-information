
const path = require('path')
// 在内存中根据指定的模块页面，在根目录生成一份内存中的页面，并自动z在页面底部引入编译好的在内存中的js文件；
const htmlWebpackPlugin = require('html-webpack-plugin')
// 写入webpack配置
module.exports = {
    entry: path.join(__dirname,  'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 配置webpack-dev-server
    // devServer: {
    //     open: true,
    //     port: 3002,
    //     contentBase: './src',
    //     hot: true
    // },
    plugins: [   // 所有的webpack的配置节点；
        // 配置htmlWebpackPlguin
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/view/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.css$/ , use: ['style-loader', 'css-loader' ] },
            { test: /\.(jpeg|png|gif|jpg|svg)$/, use: ['url-loader?limit=272052&name=[hash:8]-[name].[ext]'] },
            { test: /\.(woff|ttf|woff2|svg|eot)$/, use: ['url-loader']},
            { test:  /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    resolve: { // 配置引入文件的路径；
        alias: {
            // "vue$": "vue/dist/vue.js" // 修改 vue被导入的时候的打包路径
        }
    }   
}