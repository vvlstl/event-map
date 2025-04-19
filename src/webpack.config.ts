import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

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
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: path.resolve(__dirname, '/node_modules/'),
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
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