/**
 * @file 基于Vue的组件库, 在Vue的基础上加了一层components
 * @author Troy.Bi
 * @version 1.0.0
 */
import Vue from 'vue-audio-video:widget/lib/vue/vue.js';

// 注册所有组件
// css 组件
import Audio from './components/audio/index.js';
import Video from './components/video/index.js';

// js 组件
// 轮播组件
import Carousel from './components/carousel/index.js';
import CarouselItem from './components/carousel-item/index.js';


const install = function (Vue, config = {}) {
    if (install.installed) {
        return;
    }

    Vue.component(Audio.name, Audio);
    Vue.component(Video.name, Video);

    Vue.component(Carousel.name, Carousel);
    Vue.component(CarouselItem.name, CarouselItem);
};

// auto install
install(Vue);

module.exports = Vue;