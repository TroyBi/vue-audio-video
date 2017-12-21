<script>
import Vue from 'vue-audio-video:widget/vue/vue.js';
import { mapGetters, mapActions } from 'vue-audio-video:widget/lib/vue/vuex.js';

export default {
    name: 'app',
    data() {
        return {
            showPlayVideo: false,
            playingVideo: '',
        };
    },
    computed: {
        ...mapGetters([
            'basicConf'
        ])
    },
    methods: {
    },
    created() {
    },
}
</script>

<template>
    <div class="message-body-wrapper">
        <mpi-audio 
            :audio-src="basicConf.audio.contents.audioSrc"
            :audio-poster="basicConf.audio.contents.audioPoster"
            :audio-title="basicConf.audio.contents.audioTitle"
            :audio-author="basicConf.audio.contents.audioAuthor"
            :audio-duration="basicConf.audio.contents.audioDuration"></mpi-audio>

        <mpi-video :video-data="basicConf.video"></mpi-video>

        <mpi-video :video-data="basicConf.videoList"></mpi-video>

        
    </div>
</template>

<style lang="less" scoped>
.message-body-wrapper {
    margin: 0.2rem .2rem .6rem;
    text-align: center;
}
</style>
