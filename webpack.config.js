const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pages = ['index', 'detail', 'about']
module.exports = (env) => {
    console.log('COSt_key', env.RAPID_KEY); 
    console.log('Cost_host', env.COST_RAPID_HOST);  
    return {
        entry: pages.reduce((config, page) => {
            config[page] = `./src/assets/js/${page}.js`;
            return config;
          }, {}),
        plugins :[].concat(
            pages.map(
                (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `./src/${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
            )
            ,
        new BundleAnalyzerPlugin(),
        ),      
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './dist'),
            clean: true,
        },
        module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    devServer : {
        static: './dist',
        port: 9000
    },
    mode: 'development'
    }
}