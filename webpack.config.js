const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");
// const BundleDeclarationsWebpackPlugin = require("bundle-declarations-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const commonConfig = {
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // externals: nodeExternals(),
}

module.exports = [
    // Object.assign({}, commonConfig, {
    //     target: 'electron-main',
    //     entry: {
    //         "index": path.resolve(__dirname, 'src/index.ts')
    //     },
    //     output: {
    //         path: path.resolve(__dirname, "./dist"),
    //         library: "electronPosPrinter",
    //         filename: "[name].js",
    //         libraryTarget: "umd",
    //         umdNamedDefine: true,
    //     },
    //     optimization: {
    //         minimize: true,
    //         minimizer: [new TerserPlugin()],
    //     },
    //     plugins: [
    //         // new BundleDeclarationsWebpackPlugin(),
    //     ],

    // }),
    Object.assign({}, commonConfig, {
        target: 'electron-renderer',
        entry:  {
            "renderer": path.resolve(__dirname, 'pages')
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name]"
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Print Previews-------',
                template: 'pages/picture/index.html'
            }),
            new MiniCssExtractPlugin({
                filename:"[name].min.css"})
        ],
    })
];