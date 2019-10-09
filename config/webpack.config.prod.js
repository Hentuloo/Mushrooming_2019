const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/scripts/main.js',
    },
    output: {
        filename: '[contenthash:12]-[name].js',
        path: path.resolve(__dirname, '../', 'build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/images/[name].[ext]',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash:12]-[name].css',
        }),
        new CopyPlugin([{ from: 'src/assets', to: 'assets' }]),
    ],
};
