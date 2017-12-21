/**
 * @file mpi-audio
 * @module components/audio
 * @desc audio
 * @param {String} [audio-src] - 音频链接
 * @param {String} [audio-poster] - 音频封面
 * @param {String} [audio-title] - 音频标题
 * @param {String} [audio-author] - 音频作者
 * @param {String} [audio-duration] - 音频时长（秒）
 *
 * @example
 * <mpi-audio
     audio-src="http://kolber.github.io/audiojs/demos/mp3/juicy.mp3"
     audio-poster="http://www.17sucai.com/preview/1/2017-03-02/%E8%BD%AE%E6%92%AD/img/77.jpg"
     audio-title="你来自十月上"
     audio-author="Troy.Bi"
     audio-duration="236.3"></mpi-audio>
 */
import draggable from './draggable.js';

let interval = null;
export default {
    template: `<div class="audio">
        <div class="audio-co">
            <div class="audio-left" :style="'background-image: url(' +audioPoster+ ');'">
                <div class="audio-play-btn" @click="playAudio">
                    <i class="audio-paly retate" v-if="playing"></i>
                    <i class="audio-paly" v-else></i>
                    <span class="circle" v-if="playing"></span>
                    <span class="circle2" v-if="playing"></span>
                </div>
            </div>
            <div class="audio-right">
                <div class="title">{{audioTitle}}</div>
                <div class="author">来自 {{audioAuthor}}</div>

                <div class="mpi-range mpi-range--audio">
                    <div class="mpi-range-content" ref="content">
                      <div class="mpi-range-runway" @click="tapto($event)"></div>
                      <div class="mpi-range-progress" :style="{ width: progress + '%' }" @click="tapto($event)" ref="progress"></div>
                      <div class="mpi-range-thumb" ref="thumb" :style="{ left: progress + '%' }"></div>
                    </div>
                  </div>

                <div class="now">{{nowFormatTime}}</div>
                <div class="all">{{allFormatTime}}</div>
            </div>
            
            <audio autobuffer autoloop loop controls class="myAudio" ref="myaudio">
                <source :src="audioSrc">
            </audio>
        </div>
    </div>`,

    name: 'mpiAudio',

    data() {
        return {
            min: 0,
            max: 100,
            step: 1,
            value: 0,
            curTime: 0,
            playing: 0
        };
    },
    props: {
        audioSrc: {
            type: String,
            required: true
        },
        audioPoster: {
            type: String
        },
        audioTitle: {
            type: String,
            required: true
        },
        audioAuthor: {
            type: String,
            required: true
        },
        audioDuration: {
            type: [Number, String],
            required: true
        }
    },
    computed: {
        allFormatTime() {
            return this.convertTime(this.audioDuration);
        },
        nowFormatTime() {
            return this.convertTime(this.curTime);
        },
        progress() {
            const value = this.value;
            if (typeof value === 'undefined' || value === null) {
                return 0;
            }
            return Math.floor((value - this.min) / (this.max - this.min) * 100);
        }
    },
    methods: {
        convertTime(time) {
            let allTime = Math.ceil(time);
            const fen = Math.floor(allTime / 60);
            const miao = allTime - fen * 60;
            const endTime = (fen ? fen > 9 ? fen : '0' + fen : '00')
                + ':' + (miao ? miao > 9 ? miao : '0' + miao : '00');
            return endTime;
        },
        playAudio() {
            // let interval = null;
            if (this.playing) {
                this.playing = 0;
                // 暂停播放
                this.au.pause();
                clearInterval(interval);
            } else {
                this.playing = 1;
                this.au.currentTime = this.curTime;
                // 继续播放
                this.au.play();
                interval = setInterval(() => {
                    this.curTime = this.au.currentTime;

                    this.value = this.curTime / this.audioDuration * 100;

                    if (this.curTime >= this.audioDuration) {
                        this.curTime = 0;
                    }
                }, 50);
            }
        },
        tapto(event) {
            const content = this.$refs.content;
            const contentBox = content.getBoundingClientRect();
            const deltaX = event.pageX - contentBox.left;

            const stepCount = Math.ceil((this.max - this.min) / this.step);
            const newPosition = deltaX - deltaX % (contentBox.width / stepCount);

            let newProgress = newPosition / contentBox.width;

            if (newProgress < 0) {
                newProgress = 0;
            } else if (newProgress > 1) {
                newProgress = 1;
            }

            this.value = newProgress * 100;
            this.changeCurTime();
        },
        changeCurTime() {
            this.curTime = this.value / 100 * this.audioDuration;
            this.au.currentTime = this.curTime;
        }
    },
    created() {},
    mounted() {
        const au = this.$refs.myaudio;
        this.au = au;


        const thumb = this.$refs.thumb;
        const content = this.$refs.content;

        const getThumbPosition = () => {
            const contentBox = content.getBoundingClientRect();
            const thumbBox = thumb.getBoundingClientRect();
            return {
                left: thumbBox.left - contentBox.left,
                top: thumbBox.top - contentBox.top,
                thumbBoxLeft: thumbBox.left
            };
        };

        let dragState = {};
        draggable(thumb, {
            start: (event) => {
                const position = getThumbPosition();
                const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
                dragState = {
                    thumbStartLeft: position.left,
                    thumbStartTop: position.top,
                    thumbClickDetalX: thumbClickDetalX
                };
                clearInterval(interval);
            },
            drag: (event) => {
                
                const contentBox = content.getBoundingClientRect();
                const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;
                const stepCount = Math.ceil((this.max - this.min) / this.step);
                const newPosition = (dragState.thumbStartLeft + deltaX)
                    - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

                let newProgress = newPosition / contentBox.width;

                if (newProgress < 0) {
                    newProgress = 0;
                } else if (newProgress > 1) {
                    newProgress = 1;
                }

                this.value = newProgress * 100;
            },
            end: () => {
                this.changeCurTime();
                dragState = {};

                if (this.playing) {
                    interval = setInterval(() => {
                        this.curTime = this.au.currentTime;

                        this.value = this.curTime / this.audioDuration * 100;

                        if (this.curTime >= this.audioDuration) {
                            this.curTime = 0;
                        }
                    }, 50);
                } 

            }
        });
    }
};