import Dotenv from "dotenv-webpack";
import path from "path";
import merge from "webpack-merge";

const ROOT_PATH = path.join(__dirname, "../..");

/**
 * Common config for webpack
 * @type {Object}
 */
const defaultConfig = {
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true,
            allowEmptyValues: true,
            path: path.resolve(__dirname, "../../../.env"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            limit: 10000,
                            mimetype: "application/font-ttf",
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: { icon: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@app": path.join(ROOT_PATH + "/src/app"),
            "@pages": path.join(ROOT_PATH + "/src/pages"),
            "@widgets": path.join(ROOT_PATH + "/src/widgets"),
            "@features": path.join(ROOT_PATH + "/src/features"),
            "@entities": path.join(ROOT_PATH + "/src/entities"),
            "@shared": path.join(ROOT_PATH + "/src/shared"),
        },
    },
};

/**
 * Build config for webpack from default
 *
 * @param {Object} options The options
 * @returns {Object} Retruns a new config
 */
function configure(options: Object) {
    return merge(defaultConfig, options);
}

export default configure;
