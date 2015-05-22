var enbBemTechs = require('enb-bem-techs'),
    borschikTech = require('enb-borschik/techs/borschik'),
    isProd = process.env.YENV === 'production';

module.exports = function (config) {
    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [require('enb/techs/file-provider'), { target: '?.bemdecl.js' }],
            [enbBemTechs.files],
            [enbBemTechs.deps],

            // css
            [require('enb-stylus/techs/css-stylus'), { target: '?.noprefix.css' }],

            // js
            [require('enb-babel/techs/js-babel'), { target: '?.babel.js', babelOptions: { compact: false } }],

            // js
            [require('enb-babel/techs/append-sourcemaps'), { source: '?.pre.js', target: '_?.js' }],

            // prepend ym modules
            [require('enb-babel/techs/prepend-modules'), { source: '?.babel.js', target: '?.pre.js' }],

            // borschik
            [borschikTech, { sourceTarget: '?.css', destTarget: '_?.css', tech: 'cleancss', freeze: true, minify: isProd }],
            //[borschikTech, { sourceTarget: '?.js', destTarget: '_?.js', freeze: true, minify: isProd }]
        ]);

        nodeConfig.addTargets([
            '_?.css',
            '?.babel.js',
            '?.pre.js',
            '_?.js'
        ]);
    });
    config.nodes('*desktop.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: getDesktops(config) }],
            // autoprefixer
            [require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: ['last 2 versions', 'ie 10', 'ff 24', 'opera 12.16'],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });
};

function getDesktops(config) {
    return [
        'libs/bem-core/common.blocks',
        'reactreflux.blocks',
        'desktop.blocks'
    ].map(function (level) {
        return config.resolvePath(level);
    });
}
