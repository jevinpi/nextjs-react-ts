const withSass = require('@zeit/next-sass')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const withAntd = require('./next-antd.config');

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './styles/antd-theme.less'), 'utf8')
)

module.exports = withSass(withAntd({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
    },
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    webpack: (config, { isServer, dev }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]
            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }
        // fix: prevents error when .less files are required by node
        if (typeof require !== 'undefined') {
            require.extensions['.less'] = (file) => { }
        }
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        if (dev) {
            config.module.rules.push({
                test: /\.(ts|js|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                }]
            });
        }

        // config.resolve.alias = {
            //     styles: path.resolve(__dirname, "./styles"),
            // }
        config.resolve.alias = {
            ...config.resolve.alias,
            components: path.resolve(__dirname, "./components"),
            utils: path.resolve(__dirname, "./utils"),
            pages: path.resolve(__dirname, "./pages"),
            models: path.resolve(__dirname, "./models"),
            styles: path.resolve(__dirname, "./styles"),
        }
        return config
    }
}))
