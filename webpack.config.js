const htmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
    devServer: {
        open: true,
        contentBase: dist,
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {implementation: require("sass")}
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({template: "./src/html/index.html"}),
        new MiniCssExtractPlugin({filename: "[name].scss"}),
        new CopyWebpackPlugin([{from: 'src/img', to:'img'}]),
        new CleanWebpackPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: "jquery",
                    entry: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
                    attributes: {
                        integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
                        crossorigin: 'anonymous',
                    }
                },
                {
                    module: "bootstrap",
                    entry: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"
                },
                {
                    module: "bootstrap",
                    entry: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
                }

            ],
            enabled: process.env.NODE_ENV === "production"
        })
    ]
};
