/**
 * @file mpi-video
 */
import Carousel from '../../carousel/index.js';
import CarouselItem from '../../carousel-item/index.js';
export default {
    components: {Carousel, CarouselItem},

    template: `<div>
        <div class="component-item" v-if="videoData.type=='video1'">
            <div class="video-single">
                <div>
                    <div class="video-co" :style="'height:'+videoData.contents.wap.height+'px;background-image:url('+videoData.contents.img+')'" @click="playV(videoData.contents.video)">
                        <div class="shadow"></div>
                        <div class="play-btn"></div>
                    </div>
                </div>
                <div class="img-des" v-if="videoData.contents.des">
                    {{videoData.contents.des}}
                </div>
            </div>
        </div>
        <div class="component-item" v-if="videoData.type=='video2'">
            <div class="mpi-video-swipe" :style="'height:'+ videoData.contents.wapheight/50 +'rem;'">
                <mpi-carousel trigger="click" :height="videoData.contents.wapheight/50+ 'rem'" arrow="never" :type="videoData.contents.type" indicator-position="none">
                    <mpi-carousel-item v-for="(item, index) in videoData.contents.content" :key="item">
                        <div class="swipe-item-img" :style="'background-image: url('+item.img+');'" @click="playV(item.video)">
                            <div class="shadow"></div>
                            <div class="play-btn"></div>
                        </div>
                    </mpi-carousel-item>
                </mpi-carousel>
            </div>
        </div>

        <div v-cloak
           title="视频播放"
           v-if="showPlayVideo"
           class="mpi-video-paly">
            <video autoplay controls="controls" :src="playingVideo" ref="myvideo"></video>
        </div>
    </div>
    `,

    name: 'mpiVideo',

    data() {
        return {
            showPlayVideo: false,
            playingVideo: '',
        };
    },
    props: {
        videoData: {
            type: Object,
            required: true
        }
    },
    methods: {
        playV(video) {
            this.showPlayVideo = true;
            this.playingVideo = video;

            window.history.replaceState({player: 0}, '', '');
            if ('pushState' in window.history) {
                let href = window.location.href;
                window.history.pushState({player:1}, '', href.indexOf('player=T') == -1 ? href + '&player=T' : href);
            }
            setTimeout(() => {
                this.$refs.myvideo.play();
            }, 50);
        }
    },
    created() {
        let me = this;
        window.addEventListener('popstate', function (e) {
          if (history.state) {
            if (history.state.player == 0) {
                me.showPlayVideo = false;
                window.removeEventListener('popstate', function () {});
            }
          }
        }, false);
    },
    mounted() {
    }
};