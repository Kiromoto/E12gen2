const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    mode: 'production',
    entry: './src/index.js',
    devServer: {
        static: './dist',
        port: 8080,
        hot: false,
    },
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: "eslint-loader"
            }

        ]
    },
    devtool: 'inline-source-map',
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devServer.hot = true;
    }

    if (argv.mode === 'production') {
        config.devServer.hot = false;
    }

    return config;
}