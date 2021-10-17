const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";

const cssLoader = (options = []) => {
  const loader = [
    !isDev ? MiniCssExtractPlugin.loader : "style-loader",
    'css-loader'
  ]

  return [...loader,...options]
}

const babelLoader = (presets = []) => {
  return {
    loader: "babel-loader",
    options: {
      presets: [
        '@babel/preset-env',
        ...presets
      ]
    }
  }
}

module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill",path.join(__dirname, 'src', 'index')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        chunkFilename: '[name].js',
        //publicPath: '/'
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx','.ts', '.tsx']
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: {
              collapseWhitespace: isDev
            }
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns:[
              {
                from: path.resolve(__dirname, 'public/icon.png'),
                to: path.resolve(__dirname, 'dist')
              }
            ]
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: cssLoader()
            },
            {
                test: /\.(s[ac]ss)$/,
                use: cssLoader(['sass-loader'])
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loader: 'file-loader',
                options: {
                  name: !isDev ? '/assets/images/[name].[ext]' : '[name].[ext]'
                }
            },
            {
              test: /\.(ttf|woff|woff2|eof)$/,
              loader: 'file-loader',
              options: {
                name: !isDev ? '/assets/fonts/[name].[ext]' : '[name].[ext]'
              }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: babelLoader()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: babelLoader(['@babel/preset-react'])
            },
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: babelLoader(['@babel/preset-typescript'])
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: babelLoader(['@babel/preset-react','@babel/preset-typescript'])
            }
        ]
    }
}