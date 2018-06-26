const path = require('path');

module.exports = {
    entry: ['./polyfill.js', './src/app.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }


};