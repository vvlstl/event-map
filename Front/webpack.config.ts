import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {VueLoaderPlugin} from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {globSync} from "glob";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'

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
            new SpriteLoaderPlugin({
                plainSprite: true
            })
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
                                    // Получаем список всех less-файлов (кроме текущего)
                                    const allLessFiles = globSync(
                                        path.resolve(__dirname, 'css/**/', '*.less'),
                                        { nodir: true }
                                    ).filter(file => file !== loaderContext.resourcePath) // Исключаем текущий файл
                                        .map(file => {
                                            const relativePath = path.relative(
                                                path.resolve(__dirname, 'css'),
                                                file
                                            );
                                            return relativePath.split(path.sep).join('/');
                                        });

                                    // Добавляем новые импорты в конец содержимого
                                    return content + '\n' +
                                        allLessFiles
                                            .map((file: string) => `@import "${file}";`)
                                            .join('\n');
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.svg$/,
                    include: path.resolve(__dirname, 'images/symbol'),
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: 'symbol.svg',
                                symbolId: '[name]',
                                esModule: false
                            }
                        },
                        'svgo-loader'
                    ]
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
                publicPath: '/build/',
            },
            historyApiFallback: false,
        }
    };
};