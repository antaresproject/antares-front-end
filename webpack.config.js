var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // context: 'js/',
    entry: {
        // APPCACHE ( ESSENTIALS + CORE )
        'js/app_cache': ['./_src/templates/webpack/essentials/cache.js'],
        // FORMS
        'js/forms_basic': ['./_src/templates/webpack/forms/forms_basic.js'],
        'js/forms_advanced': ['./_src/templates/webpack/forms/forms_advanced.js'],
        //APP VIEWS
        'js/view_charts': ['./_src/templates/webpack/views/view_charts.js'],
        'js/view_datatables': ['./_src/templates/webpack/views/view_datatables.js'],
        'js/view_brand_settings': ['./_src/templates/webpack/views/view_brand_settings.js'],
        'js/view_gridstack': ['./_src/templates/webpack/views/view_gridstack.js'],
        //CSS
        // 'js/css': ['./_src/templates/webpack/essentials/css.js'],

    },
    output: {
        path: "_dist",
        filename: "[name].js",
    },
    module: {
        loaders: [{
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.pug$/,
                loader: 'pug-loader'
            }, 
            {
                // images
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                exclude: [/fonts/],
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/webpack/[name].[ext]',
                    'image-webpack?{optimizationLevel: 7, interlaced: false, mozjpeg: {quality: 65}}'
                ]
            }, {
                //css
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                loader: "style-loader!css-loader"
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: [/img/],
                loader: 'file-loader?&name=fonts/webpack/[name].[ext]',
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    externals: {
        'jquery': '$',
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin,
        // new FaviconsWebpackPlugin({
        //     title: 'Antares',
        //     // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        //     icons: {
        //       android: true,
        //       appleIcon: true,
        //       appleStartup: true,
        //       coast: false,
        //       favicons: true,
        //       firefox: true,
        //       opengraph: false,
        //       twitter: false,
        //       yandex: false,
        //       windows: false
        //     },
        //     logo: './_src/img/theme/antares/logo/Logo.png',
        // }),
        new HtmlWebpackPlugin({
            title: 'Antares Dashboard',
            template: '!!pug!./_src/templates/pages/dashboard.pug',
            inject: false,
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Table',
            template: '!!pug!./_src/templates/pages/clients_list.pug',
            inject: false,
            filename: 'clients_list.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Settings',
            template: '!!pug!./_src/templates/pages/general_settings.pug',
            inject: false,
            filename: 'general_settings.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Email Settings',
            template: '!!pug!./_src/templates/pages/email_settings.pug',
            inject: false,
            filename: 'email_settings.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Brand Settings',
            template: '!!pug!./_src/templates/pages/brand_settings.pug',
            inject: false,
            filename: 'brand_settings.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Brand List',
            template: '!!pug!./_src/templates/pages/brand_list.pug',
            inject: false,
            filename: 'brand_list.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Clients Details',
            template: '!!pug!./_src/templates/pages/clients_details.pug',
            inject: false,
            filename: 'clients_details.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Forms',
            template: '!!pug!./_src/templates/pages/forms.pug',
            inject: false,
            filename: 'forms.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Forms',
            template: '!!pug!./_src/templates/pages/forms-horizontal.pug',
            inject: false,
            filename: 'forms-hor.html'
        }),
        new HtmlWebpackPlugin({
            title: '400',
            template: '!!pug!./_src/templates/pages/error_400.pug',
            inject: false,
            filename: 'error_400.html'
        }),
        new HtmlWebpackPlugin({
            title: '500',
            template: '!!pug!./_src/templates/pages/error_500.pug',
            inject: false,
            filename: 'error_500.html'
        }),
        new HtmlWebpackPlugin({
            title: '500',
            template: '!!pug!./_src/templates/pages/error_404.pug',
            inject: false,
            filename: 'error_404.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Create',
            template: '!!pug!./_src/templates/pages/steps.pug',
            inject: false,
            filename: 'steps.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            template: '!!pug!./_src/templates/pages/login.pug',
            inject: false,
            filename: 'login-page.html'
        }),
        new NyanProgressPlugin(),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        }),
        // new BundleAnalyzerPlugin({
        //     reportFilename: './reports/webpack/report.html',
        //     analyzerMode: 'static',
        //     generateStatsFile: true,
        //     statsFilename: 'stats.json',
        // }),
        // new OfflinePlugin({
        //     caches: {
        //         // main:['webpack.app_cache.js'],
        //         // main:['js/app_cache.js', 'js/css.js'],
        //         main:['js/app_cache.js'],
        //         // main:['./webpack/webpack.app_cache.js'],
        //         // additional: ['webpack.CV_dashboard.js', 'webpack.CV_brand_settings.js', 'webpack.CV_datatables.js']
        //     }, 
        //     // caches: 'all',
        //     // relativePaths: false,
        //     // publicPath: '../js/',
        //     // AppCache: false,
        //     AppCache:{
        //         directory:'appcache',
        //         disableInstall: true,
        //         // cache',
        //         // publicPath:'../js'
        //     },
        //     // publicPath:'webpack/',
        //     // ServiceWorker: {
        //     //     events: true,
        //     //     output:'./cache_sw.js',
        //     //     // scope:'scriptURL',
        //     // }
        //     ServiceWorker: false,
        // }),
        // new ServiceWorkerWebpackPlugin({
        //   entry: './sw.js',
        // }),
    ],
    // devtool: 'eval'
};
