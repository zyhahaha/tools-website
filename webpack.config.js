const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development', // 或 'production'  
    entry: {
        // 这里可以定义多个入口点，但根据您提供的结构，我们可能需要为每个页面单独配置  
        // 例如，为 love 页面配置入口  
        love: './pages/love/src/js/index.js',
        // 可以为其他页面添加更多入口  
    },
    output: {
        filename: '[name].[contenthash].js', // 使用哈希来缓存清除  
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 清理/dist 文件夹  
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // 使用 mini-css-extract-plugin 提取CSS到单独的文件  
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules目录  
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 使用Babel来转译JS  
                    },
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/', // 输出到dist/fonts/  
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // 提取的CSS文件名  
            chunkFilename: '[id].[contenthash].css',
        }),
        new CleanWebpackPlugin(), // 清理dist文件夹  
        // 为每个页面生成HTML文件  
        new HtmlWebpackPlugin({
            template: './pages/love/index.html',
            filename: 'love.html',
            chunks: ['love'], // 注入与入口对应的JS文件  
        }),
        // 可以为其他页面添加更多HtmlWebpackPlugin实例  
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

// 注意：您需要在项目中安装以下npm包
// npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env mini-css-extract-plugin clean-webpack-plugin html-webpack-plugin file-loader css-loader