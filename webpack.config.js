const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "main.js"
    },
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.woff|\.woff2|\.svg|\.jpg|\.png$/,
                use: {
                    loader: "url-loader"
                }
            },
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 9000
    },
    plugins: [new MiniCssExtractPlugin()]
}