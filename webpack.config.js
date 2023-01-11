const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
        open: true,
        port: 9000,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devtool: 'inline-source-map',
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],

        extensionAlias: {
            '.js': ['.js', '.ts'],
            '.cjs': ['.cjs', '.cts'],
            '.mjs': ['.mjs', '.mts'],
        },
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            { test: /\.handlebars$/, loader: 'handlebars-loader' },
            { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
            {
                test: /config\.json$/,
                loader: 'special-loader',
                type: 'javascript/auto',
            },

            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/assets/app.html',
        }),
        new MiniCssExtractPlugin(),
        new SpriteLoaderPlugin(),
    ],
};
