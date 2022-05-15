var path = require('path');
module.exports = {
    entry: './main.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'gen')
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'gen'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'gen'),
        },
        compress: true,
        port: 9000,
    },
};
