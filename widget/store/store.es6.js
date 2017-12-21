/**
 * @file store
 * @author Troy.Bi
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue-audio-video:widget/lib/vue/vue.js';
import Vuex from 'vue-audio-video:widget/lib/vue/vuex.js';
// import apis from '../api/api.es6.js';

import {
    SUBMIT_BASIC_CONF
} from './mutation-type.es6.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        basicConf: {
            audio: {
                "type": "audio",
                "mainType": "audio",
                "title": "音频",
                "mid": 1513741519617,
                "contents": {
                  "audioSrc": "http://kolber.github.io/audiojs/demos/mp3/juicy.mp3",
                  "audioPoster": "http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg",
                  "audioTitle": "来自派的音乐",
                  "audioAuthor": "Troy.Bi",
                  "audioDuration": "237"
                }
            },
            video: {
                "type": "video1",
                "mainType": "video",
                "title": "视频",
                "mid": 1513827297286,
                "contents": {
                  "isTop": 0,
                  "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4",
                  "img": "http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg",
                  "des": "这是视频描述1",
                  "pc": {
                    "width": 800,
                    "height": 350
                  },
                  "wap": {
                    "height": 400
                  }
                }
            },
            videoList: {
                "type": "video2",
                "mainType": "video",
                "title": "视频",
                "mid": 1513251624012,
                "contents": {
                  "wapheight": 160,
                  "pcheight": 300,
                  "type": "normal",
                  "content": [
                    {
                      "video": "http://baidu-pai.cdn.bcebos.com/baidu-pai/baidu-pai/video/1110443008_1510729990.mp4",
                      "img": "http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg"
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
        }
    },
    mutations: {
        // [SUBMIT_BASIC_CONF](state, data) { // 配置内容信息
        //     alert('提交成功');
        // }
    },
    actions: {
        // 配置内容信息
        // submitBasicConf({commit}, param) {
        //     return apis.submitBasicConf(param).then(json => {
        //         if(json.errno === 0) {
        //             commit(SUBMIT_BASIC_CONF, json.data);
        //         } else {
        //             alert(json.errMsg || '内容配置失败');
        //             return;
        //         }
        //         return Promise.resolve(json);
        //     });
        // }
    },
    getters: {
        basicConf: (state, getters) => state.basicConf
    }
});

export default store;