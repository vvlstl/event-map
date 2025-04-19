import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {VueLoaderPlugin} from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {globSync} from "glob";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

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
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new CssMinimizerPlugin(),
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
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.less$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                additionalData: (content: string, loaderContext: any) => {
                                    // Динамически читаем файлы при каждой компиляции
                                    const relativeLessFiles = globSync(
                                        path.resolve(__dirname, 'css/partials/', '*.less')
                                    ).map(file => `partials/${path.basename(file)}`);

                                    return relativeLessFiles
                                        .map((file: string) => `@import "${file}";`)
                                        .join('\n') + content;
                                }
                            }
                        }
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
            alias: {
                '~/*': path.resolve(__dirname, '/*'),
            },
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