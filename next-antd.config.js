const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

module.exports = (nextConfig = {}) => ({
    ...nextConfig,
    ...{
        webpack(config, options) {
            if (!options.defaultLoaders) {
                throw new Error(
                    'Next.js版本过低，请升级您的版本',
                );
            }

            const { dev, isServer } = options;
            const { cssModules, cssLoaderOptions, postcssLoaderOptions, lessLoaderOptions = {} } = nextConfig;

            // less配置
            const baseLessConfig = {
                extensions: ['less'],
                cssModules,
                cssLoaderOptions,
                postcssLoaderOptions,
                dev,
                isServer,
                loaders: [
                    {
                        loader: 'less-loader',
                        options: lessLoaderOptions,
                    },
                ],
            };

            config.module.rules.push({
                test: /\.less$/,
                exclude: /node_modules/,
                use: cssLoaderConfig(config, { ...baseLessConfig, cssModules: false }),
            });

            // 支持css-module
            config.module.rules.push({
                test: /\.module.less$/,
                exclude: /node_modules/,
                use: cssLoaderConfig(config, { ...baseLessConfig, cssModules: true }),
            });

            // antd的less配置
            const antdLessConfig = {
                ...baseLessConfig,
                ...{ cssModules: false, cssLoaderOptions: {}, postcssLoaderOptions: {} },
            };

            config.module.rules.push({
                test: /\.less$/,
                include: /node_modules/,
                use: cssLoaderConfig(config, antdLessConfig),
            });

            // for antd less in server (yarn build)
            if (isServer) {
                const antdStyles = /antd\/.*?\/style.*?/;
                const rawExternals = [...config.externals];

                config.externals = [
                    (context, request, callback) => {
                        if (request.match(antdStyles)) {
                            return callback();
                        }

                        if (typeof rawExternals[0] === 'function') {
                            rawExternals[0](context, request, callback);
                        } else {
                            callback();
                        }
                    },
                    ...(typeof rawExternals[0] === 'function' ? [] : rawExternals),
                ];

                config.module.rules.unshift({
                    test: antdStyles,
                    use: 'null-loader',
                });
            }

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options);
            }

            return config;
        },
    },
});
