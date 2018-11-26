// webpack.config.js
var webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.BUILD_DEVELOPMENT || false)),
  __PRODUCTION__: JSON.stringify(JSON.parse(process.env.BUILD_PRODUCTION || false))
});

const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  isProduction ? new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }) : null,
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
];

module.exports = {
  // entry: {
  //   site: './source/javascripts/site.js',
  //   styles: './source/assets/stylesheets/styles.scss'
  // },
  entry: './assets/javascripts/index.js',

  devtool: isProduction ? false : 'source-map',

  // resolve: {
  //   root: __dirname + '/source/javascripts',
  // },
  // resolve: {
  //   modules: [__dirname, 'node_modules'],
  //   alias:{
  //     Mod1: 'public/components/mod1.jsx',
  //     Mod2:'public/components/mod2.jsx',
  //     Mod3: 'public/components/mod3.jsx'
  //   },
  //   extensions: ['*','.js','.jsx']
  // },
  output: {
    library: 'MyApp',
    path: __dirname + '/.tmp/dist',
    filename: 'javascripts/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
    // rules: [
    //   {
    //     test: /source\/assets\/javascripts\/.*\.js$/,
    //     exclude: /node_modules|\.tmp|vendor/,
    //     loader: 'babel-loader',
    //     query: {
    //       presets: ['es2015', 'stage-0']
    //     },
    //   },
    //   {
    //     test: /.*\.scss$/,
    //     loader: ExtractTextPlugin.extract(
    //       "style",
    //       "css!sass?sourceMap&includePaths[]=" + __dirname + "/node_modules"
    //     )
    //   },
    //   // Load plain-ol' vanilla CSS
    //   { test: /\.css$/, loader: "style!css" },
    // ],
  },
  plugins: isProduction ? productionPlugins : [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
  ]
};
