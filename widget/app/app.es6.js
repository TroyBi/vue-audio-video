/**
 * @file: app
 * @author: Troy.Bi
 */

import Vue from 'vue-audio-video:widget/vue/vue.js';
import store from '../store/store.es6.js';
// import $ from 'vue-audio-video:widget/lib/jquery/jquery.js';
import app from '../components/app.vue';

export default {
    init() {
        new Vue({
            el: '.app-mount-dom',
            store: store,
            components: {app}
        });
    }
}