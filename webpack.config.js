const banner = `
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Files
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

`;

var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HappyPack = require('happypack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var OfflinePlugin = require('offline-plugin');

module.exports = {

    context: path.resolve(__dirname),
    cache: true,
    entry: {
        'app_cache': ['./_src/templates/webpack/essentials/cache.js'],
        'forms_basic': ['./_src/templates/webpack/forms/forms_basic.js'],
        'forms_advanced': ['./_src/templates/webpack/forms/forms_advanced.js'],
        'view_charts': ['./_src/templates/webpack/views/view_charts.js'],
        'view_datatables': ['./_src/templates/webpack/views/view_datatables.js'],
        'view_brand_settings': ['./_src/templates/webpack/views/view_brand_settings.js'],
        'view_gridstack': ['./_src/templates/webpack/views/view_gridstack.js']
    },
    output: {
        path: "_dist/",
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /.js$/,
            loaders: ['happypack/loader'],
            include: [],
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.ejs/,
            loader: "template-html-loader"
        }, {
            test: /\.css$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('postcss-cssnext')({
                    warnForDuplicates: false
                })]
            }
        }, {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            exclude: [/fonts/],
            use: [
                'file?hash=sha512&digest=hex&name=img/webpack/[name].[ext]',
                'image-webpack'
            ]
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            exclude: [/img/],
            loader: 'file-loader?&name=fonts/webpack/[name].[ext]',
        }]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    externals: {
        'jquery': '$'
    },
    devServer: {
        contentBase: path.join(__dirname, "_dist/"),
        compress: true,
        port: 9000,
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new DashboardPlugin(),
        new ProgressBarPlugin(),
        new HappyPack({
            loaders: ['babel?presets[]=babili'],
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: '_src/img/', to: 'img/' },
            { from: '_src/fonts/', to: 'fonts/' },
        ]),
        new HtmlWebpackPlugin({
            title: 'Antares Dashboard',
            template: '_src/templates/pages/dashboard.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'index.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_charts']

        }),
        new HtmlWebpackPlugin({
            title: 'Antares Table',
            template: '_src/templates/pages/clients_list.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'clients_list.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']

        }),
        new HtmlWebpackPlugin({
            title: 'Antares Settings',
            template: '_src/templates/pages/general_settings.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'general_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Email Settings',
            template: '_src/templates/pages/email_settings.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'email_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Brand Settings',
            template: '_src/templates/pages/brand_settings.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'brand_settings.html',
            chunks: ['app_cache', 'forms_advanced', 'view_brand_settings']
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Brand List',
            template: '_src/templates/pages/brand_list.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'brand_list.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']
        }),
        new HtmlWebpackPlugin({
            title: 'Antares Clients Details',
            template: '_src/templates/pages/clients_details.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'clients_details.html',
            chunks: ['app_cache', 'forms_basic', 'view_datatables']
        }),
        new HtmlWebpackPlugin({
            title: 'Forms',
            template: '_src/templates/pages/forms.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'forms.html',
            chunks: ['app_cache', 'forms_advanced']
        }),
        new HtmlWebpackPlugin({
            title: 'Forms',
            template: '_src/templates/pages/forms_horizontal.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'forms_hor.html',
            chunks: ['app_cache', 'forms_advanced']
        }),
        new HtmlWebpackPlugin({
            title: '400',
            template: '_src/templates/pages/error_400.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'error_400.html',
            chunks: ['app_cache', 'forms_basic']
        }),
        new HtmlWebpackPlugin({
            title: '500',
            template: '_src/templates/pages/error_500.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'error_500.html'
        }),
        new HtmlWebpackPlugin({
            title: '404',
            template: '_src/templates/pages/error_404.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'error_404.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Create',
            template: '_src/templates/pages/steps.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'steps.html',
            chunks: ['app_cache', 'forms_basic']
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            template: '_src/templates/pages/login.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'login_page.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Table Filter',
            template: '_src/templates/pages/table_filter.ejs',
            inject: true,
            cache: true,
            hash: true,
            showErrors: true,
            minify: {
                html5: true,
                removeComments: true,
                sortClassName: true,
                preserveLineBreaks: true,
                collapseWhitespace: true,
                decodeEntities: true
            },
            filename: 'table_filter.html',
            chunks: ['app_cache', 'forms_basic', 'view_gridstack', 'view_datatables']
        }),
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
        //     logo: './_src/img/theme/antares/logo/logo_circle.png',
        // }),
    ],
};
