const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanPlugin, Template } = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
console.log(isDevelopment);
const webpack = require('webpack')
module.exports = {
   entry: {
      build: "./src/index.ts"
   },
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js"
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'public/index.html'
      }),
      new CleanPlugin(),
      new MiniCssExtractPlugin({
         filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
         chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css'
      })
   ],
   module: {
      rules: [
         { test: /\.css$/, use: ['style-loader', 'css-loader', "postcss-loader"] },
         {
            test: /\.module\.s(a|c)ss$/,
            use: [
               isDevelopment ?
                  'style-loader' :
                  MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     modules: {
                        mode: 'local',
                        localIdentName: '[local]--[hash:base64:5]'
                     },
                     sourceMap: isDevelopment
                  }
               },

               {
                  loader: 'sass-loader',
                  options: {
                     module: true,
                     sourceMap: isDevelopment
                  }
               }

            ]
         },
         {
            test: /\.s(a|c)ss$/,
            use: [
               isDevelopment ?
                  'style-loader' :
                  MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     modules: {
                        mode: 'local',
                        localIdentName: '[local]--[hash:base64:5]'
                     },
                     sourceMap: isDevelopment
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: isDevelopment
                  }
               }


            ]
         },
         {
            test: /\.(tsx|ts)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: [{
               loader: 'babel-loader',
               options: {
                  presets: [
                     ['@babel/preset-env', {
                        "targets": "defaults"
                     }],
                     '@babel/preset-react'
                  ]
               }
            }]
         }
      ]
   },


   devServer: {
      port: 8000,
      open: true,

   }
}