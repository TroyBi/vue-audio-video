# vue-audio-video
基于vue的audio和video播放器前端组件


# fis3
这个domo是基于fis3做的实现。

fis3 是百度开发的面向前端的工程构建工具。对于前端工程，在性能优化、资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）、模块化开发、自动化工具、开发规范、代码部署等问题上有较好的实现。

参考：http://fis.baidu.com/

# vue
audio 和 video 这两个组件的实现没有采用.vue文件，而是分为js和less，来兼容fis3的模块化开发。

# vue-audio-video主要包含的插件
1. audio插件

通过隐藏的audio元素来播放音频；通过音频播放时间currentTime来控制播放条进度；通过draggable来监听拖拽事件，实现拖拽进度条，并在拖拽事件结束时触发播放时间的修改。

![](http://iknow-base.bj.bcebos.com/pai%2FMacHi%202017-12-21%2015-41-06.png)

使用方式（参数）
```javascript
    <mpi-audio 
        :audio-src="basicConf.audio.contents.audioSrc"  // 音频链接
        :audio-poster="basicConf.audio.contents.audioPoster"  // 音频封面图
        :audio-title="basicConf.audio.contents.audioTitle"  // 音频标题
        :audio-author="basicConf.audio.contents.audioAuthor"  // 音频作者
        :audio-duration="basicConf.audio.contents.audioDuration">  // 音频时长（秒）
    </mpi-audio>
```



2. video插件

video插件包含单个视频和多个视频轮播等多种样式。

使用方式（参数）
```javascript
    <mpi-video :video-data="basicConf.video">  // video-data是video的参数
    </mpi-video>
```
其中，单个视频需要传的参数包含：
```javascript
    {
        "type": "video1",
        "mainType": "video",
        "title": "视频",
        "mid": 1513827297286,
        "contents": {
          "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4", // 视频链接
          "img": "http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg", // 视频封面
          "des": "这是视频描述1", // 视频描述
          "pc": {  // pc端宽高
            "width": 800,
            "height": 350
          },
          "wap": {  // wap端高度
            "height": 400
          }
        }
    }
```

其中，多个视频需要传的参数包含：
```javascript
    {
        "type": "video2",
        "mainType": "video",
        "title": "视频",
        "mid": 1513251624012,
        "contents": {
          "wapheight": 160,
          "pcheight": 300,
          "type": "card", // 可设置轮播类型，分为normal、space、card三种类型
          "content": [
            {
              "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4",  // 视频链接
              "img": "http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg" // 视频封面
            },
            {
              "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4",
              "img": "http://iknow02.bosstatic.bdimg.com/pai-pc/zhengyilianmeng/E1-414X170@2.png"
            },
            {
              "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4",
              "img": "https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D680%2C800/sign=af1f65469782d158bbd751b7b83a35e0/3bf33a87e950352ab84ac6a05843fbf2b2118b6b.jpg"
            }
          ],
          "swipeId": "video-swipe-1513251624012"
        }
    }
```

space类型：
![](http://iknow-base.bj.bcebos.com/pai%2F00-video.png)
card类型：
![](http://iknow-base.bj.bcebos.com/pai%2F01-video.png)
normal类型：
![](http://iknow-base.bj.bcebos.com/pai%2F02-video.png)

# 目录

```javascript
.
├── page
│   ├── layout
│   │   └── layout.tpl
│   └── index.ejs
├── static
│   ├── js
│   │   └── pi-flexible.js
│   └── lib
│       └── mod.js
├── test
│   └── api
│       └── submitBasicconf.json
├── widget
│   ├── api
│   │   └── api.es6.js
│   ├── app
│   │   ├── app.es6.js
│   │   ├── app.less
│   │   └── app.tpl
│   ├── components
│   │   └── app.vue
│   ├── css
│   │   └── base.less
│   ├── lib
│   │   ├── axios
│   │   │   └── axios.js
│   │   └── vue
│   │       ├── vue.js
│   │       └── vuex.js
│   ├── vue
│   │   ├── components
│   │   │   ├── audio/    // 音频组件
│   │   │   ├── video/    // 视频组件
│   │   │   ├── carousel-item/
│   │   │   └── carousel/
│   │   ├── utils/
│   │   ├── vue.js
│   │   └── vuex.js
│   └── store
│       ├── mutation-type.es6.js
│       └── store.es6.js
├── .gitignore
├── fis-conf.js
└── server.conf
```

# 运行

安装fis3以及各种插件

```javascript
git clone https://github.com/TroyBi/vue-audio-video.git

cd vue-audio-video

fis3 release 
```
访问 http://127.0.0.1:8080/page/index
