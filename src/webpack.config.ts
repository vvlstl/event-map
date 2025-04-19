import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {VueLoaderPlugin} from "vue-loader";

type TMode = 'development' | 'production';

interface EnvVariables {
    mode: TMode,
}

export default (env: EnvVariables) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'index.ts'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'templates', 'index.html'),
            }),
            new VueLoaderPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        }
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
        },
        devServer: {
            port: 5000,
            open: true,
            static: {
                directory: path.resolve(__dirname, 'build'),
            },
            historyApiFallback: false,
        }
    };
};