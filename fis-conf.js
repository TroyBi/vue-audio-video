/*
 * fis-conf.js
 * fis3-smarty
 */

// 项目基础配置
fis.require('smarty')(fis);
fis.set('namespace', 'vue-audio-video');
fis.set('project.charset', 'utf8');
fis.set('project.md5Connector ', '_');
// 将输出的js里面中文进行unicode编码
fis.set('settings.optimizer.uglify-js.output.ascii_only', true);
// 设置sprite
fis.match('**.{css, less}', {
    useSprite: true
});

// 自定义less parser
fis.match('**.less', {
    parser: fis.plugin('less')
});

// 同名依赖：当设置开启同名依赖，模板会依赖同名css、js；js 会依赖同名 css，不需要显式引用。
fis.match('/widget/**', {
    useSameNameRequire: true,
    shimProcess: false,
    skipBrowserify: true
});

// 用babel-5.x处理es6
fis.match('/widget/**.{es6.js, jsx}', {
    isMod: true,
    useHash: true,
    parser: fis.plugin('babel-5.x'),
    rExt: 'js'
});
fis.match('/widget/vue/**.js', {
    isMod: true,
    useHash: true,
    parser: fis.plugin('babel-5.x'),
    rExt: 'js'
});

// vue基础配置
fis.match('/widget/**.vue', {
    isMod: true,
    useHash: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('vue-component')
    ],
});
// vue组件中ES2015处理 
fis.match('/widget/**.vue:js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('babel-5.x'),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});
fis.match('/widget/**.vue:less', {
    rExt: 'css',
    parser: [fis.plugin('less')],
    postprocessor: fis.plugin('autoprefixer')
});

// 定义打包规则
fis.match('::package', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('json2php'),
    prepackager: [
        fis.plugin('widget-inline'),
        fis.plugin('js-i18n')
    ],
    packager: fis.plugin('map', {
        'static/pkg/all.css': [
            'widget/**.css',
            'widget/**.less'
        ],
        'static/pkg/all.js': [
            'widget/**.js',
            'widget/**.vue'
        ]
    })
}).match('**map.php', {
    // 本地调试，发布到templeta同级的config
    release: '/config/${namespace}-map.php'
});

//不发布的模块
// fis.match('/{*.js, BCLOUD, *.sh, output/**, **.json}', {
//     release: false
// });

// 线上编译规则
fis.media('prod').match('/{test/**, server.conf, **.json}', {
    release: false
}).match('**.{js, es, css, less}', {
    domain: '-------'
}).match('**.{svg, tif, tiff, wbmp,png, bmp, fax, gif, ico, jfif, jpe, jpeg,jpg, woff, cur, webp, ttf, eot, woff2}', {
    domain: '------'
}).match('::package', {
    prepackager: [
        fis.plugin('widget-inline'),
        fis.plugin('js-i18n')
    ]
}).match('**map.php', {
    // release到config目录下
    release: '/template/config/${namespace}-map.php'
});
