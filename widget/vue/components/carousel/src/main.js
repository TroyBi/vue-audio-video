import throttle from '../../../utils/throttle';
import {addResizeListener, removeResizeListener} from '../../../utils/resize-event';
export default {
    template: `
  <div
class="mpi-carousel"
:class="{ 'mpi-carousel--card': type === 'card', 'mpi-carousel--space': type === 'space' }"
@mouseenter.stop="handleMouseEnter"
@mouseleave.stop="handleMouseLeave">
    <div
class="mpi-carousel__container"
:style="{ height: height }">
    <transition name="carousel-arrow-left">
    <button
v-if="arrow !== 'never'"
  v-show="arrow === 'always' || hover"
@mouseenter="handleButtonEnter('left')"
@mouseleave="handleButtonLeave"
@click.stop="throttledArrowClick(activeIndex - 1)"
class="mpi-carousel__arrow mpi-carousel__arrow--left">
    <i class="pi-icon-arrow-left"></i>
    </button>
    </transition>
    <transition name="carousel-arrow-right">
    <button
v-if="arrow !== 'never'"
  v-show="arrow === 'always' || hover"
@mouseenter="handleButtonEnter('right')"
@mouseleave="handleButtonLeave"
@click.stop="throttledArrowClick(activeIndex + 1)"
class="mpi-carousel__arrow mpi-carousel__arrow--right">
    <i class="pi-icon-arrow-right"></i>
    </button>
    </transition>
    <slot></slot>
    </div>
    <ul
class="mpi-carousel__indicators"
v-if="indicatorPosition !== 'none'"
    :class="{ 'mpi-carousel__indicators--labels': hasLabel, 'mpi-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card' || type === 'space' }">
    <li
v-for="(item, index) in items"
    class="mpi-carousel__indicator"
:class="{ 'is-active': index === activeIndex }"
@mouseenter="throttledIndicatorHover(index)"
@click.stop="handleIndicatorClick(index)">
    <button class="mpi-carousel__button"><span v-if="hasLabel">{{ item.label }}</span></button>
</li>
</ul>
</div>
  `,
    name: 'mpi-carousel',
    props: {
        initialIndex: {
            type: Number,
            default: 0
        },
        height: String,
        trigger: {
            type: String,
            default: 'hover'
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 3000
        },
        indicatorPosition: String,
        indicator: {
            type: Boolean,
            default: true
        },
        arrow: {
            type: String,
            default: 'never'
        },
        type: String
    },
    data() {
        return {
            items: [],
            activeIndex: -1,
            containerWidth: 0,
            timer: null,
            hover: false,

            dragging: false,
            userScrolling: false,
            noDrag: false,
            animating: false
        };
    },
    computed: {
        hasLabel() {
            return this.items.some(item => item.label.toString().length > 0);
        }
    },
    watch: {
        items(val) {
            if (val.length > 0) {
                this.setActiveItem(this.initialIndex);
            }
        },
        activeIndex(val, oldVal) {
            this.resetItemPosition();
            this.$emit('change', val, oldVal);
        },
        autoplay(val) {
            val ? this.startTimer() : this.pauseTimer();
        }
    },
    methods: {
        handleMouseEnter() {
            this.hover = true;
            this.pauseTimer();
        },
        handleMouseLeave() {
            this.hover = false;
            this.startTimer();
        },
        itemInStage(item, index) {
            const length = this.items.length;
            if (index === length - 1 && item.inStage && this.items[0].active
                || (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
                return 'left';
            } else if (index === 0 && item.inStage && this.items[length - 1].active
                || (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
                return 'right';
            }
            return false;
        },
        handleButtonEnter(arrow) {
            this.items.forEach((item, index) => {
                if (arrow === this.itemInStage(item, index)) {
                    item.hover = true;
                }
            });
        },
        handleButtonLeave() {
            this.items.forEach(item => {
                item.hover = false;
            });
        },
        updateItems() {
            this.items = this.$children.filter(child => child.$options.name === 'MpiCarouselItem');
        },
        resetItemPosition() {
            this.items.forEach((item, index) => {
                item.translateItem(index, this.activeIndex);
            });
        },
        playSlides() {
            if (this.activeIndex < this.items.length - 1) {
                this.activeIndex++;
            } else {
                this.activeIndex = 0;
            }
        },
        pauseTimer() {
            clearInterval(this.timer);
        },
        startTimer() {
            if (this.interval <= 0 || !this.autoplay) {
                return;
            }
            this.timer = setInterval(this.playSlides, this.interval);
        },
        setActiveItem(index) {
            if (typeof index === 'string') {
                const filteredItems = this.items.filter(item => item.name === index);
                if (filteredItems.length > 0) {
                    index = this.items.indexOf(filteredItems[0]);
                }
            }
            index = Number(index);
            if (isNaN(index) || index !== Math.floor(index)) {
                process.env.NODE_ENV !== 'production' &&
                console.warn('[Element Warn][Carousel]index must be an integer.');
                return;
            }
            let length = this.items.length;
            if (index < 0) {
                this.activeIndex = length - 1;
            } else if (index >= length) {
                this.activeIndex = 0;
            } else {
                this.activeIndex = index;
            }
        },
        prev() {
            this.setActiveItem(this.activeIndex - 1);
        },
        next() {
            this.setActiveItem(this.activeIndex + 1);
        },
        handleIndicatorClick(index) {
            this.activeIndex = index;
        },
        handleIndicatorHover(index) {
            if (this.trigger === 'hover' && index !== this.activeIndex) {
                this.activeIndex = index;
            }
        },


        doOnTouchStart(event) {
            if (this.noDrag) {
                return;
            }

            let element = this.$el;
            let dragState = this.dragState;
            let touch = event.touches[0];

            dragState.startTime = new Date();
            dragState.startLeft = touch.pageX;
            dragState.startTop = touch.pageY;
            dragState.startTopAbsolute = touch.clientY;

            dragState.pageWidth = element.offsetWidth;
            dragState.pageHeight = element.offsetHeight;

            let prevPage = this.$children[this.index - 1];
            let dragPage = this.$children[this.index];
            let nextPage = this.$children[this.index + 1];

            if (this.continuous && this.pages.length > 1) {
                if (!prevPage) {
                    prevPage = this.$children[this.$children.length - 1];
                }
                if (!nextPage) {
                    nextPage = this.$children[0];
                }
            }

            dragState.prevPage = prevPage ? prevPage.$el : null;
            dragState.dragPage = dragPage ? dragPage.$el : null;
            dragState.nextPage = nextPage ? nextPage.$el : null;

            if (dragState.prevPage) {
                dragState.prevPage.style.display = 'block';
            }

            if (dragState.nextPage) {
                dragState.nextPage.style.display = 'block';
            }
        },

        doOnTouchMove(event) {
            if (this.noDrag) {
                return;
            }

            let dragState = this.dragState;
            let touch = event.touches[0];

            dragState.currentLeft = touch.pageX;
            dragState.currentTop = touch.pageY;
            dragState.currentTopAbsolute = touch.clientY;

            let offsetLeft = dragState.currentLeft - dragState.startLeft;
            let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

            let distanceX = Math.abs(offsetLeft);
            let distanceY = Math.abs(offsetTop);
            if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
                this.userScrolling = true;
                return;
            } else {
                this.userScrolling = false;
                event.preventDefault();
            }
        },

        doOnTouchEnd() {
            if (this.noDrag) {
                return;
            }

            let dragState = this.dragState;

            let dragDuration = new Date() - dragState.startTime;
            let towards = null;

            let offsetLeft = dragState.currentLeft - dragState.startLeft;
            let offsetTop = dragState.currentTop - dragState.startTop;
            let pageWidth = dragState.pageWidth;

            if (dragDuration < 300 && dragState.currentLeft === undefined) {
                return;
            }

            if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
                towards = offsetLeft < 0 ? 'next' : 'prev';

                if (towards === 'prev') {
                    this.prev();
                } else if (towards === 'next') {
                    this.next();
                }
            }

            this.dragState = {};
        }
    },
    created() {
        this.throttledArrowClick = throttle(300, true, index => {
            this.setActiveItem(index);
        });
        this.throttledIndicatorHover = throttle(300, index => {
            this.handleIndicatorHover(index);
        });

        this.dragState = {};
    },
    mounted() {
        this.updateItems();
        this.$nextTick(() => {
            addResizeListener(this.$el, this.resetItemPosition);
            if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
                this.activeIndex = this.initialIndex;
            }
            this.startTimer();
        });

        // wap端滑动
        let element = this.$el;

        element.addEventListener('touchstart', (event) => {
            if (this.prevent) {
                event.preventDefault();
            }
            if (this.stopPropagation) {
                event.stopPropagation();
            }
            if (this.animating) {
                return;
            }
            this.dragging = true;
            this.userScrolling = false;
            this.doOnTouchStart(event);
        });

        element.addEventListener('touchmove', (event) => {
            if (!this.dragging) {
                return;
            }
            if (this.timer) {
                this.pauseTimer();
            }
            this.doOnTouchMove(event);
        });

        element.addEventListener('touchend', (event) => {
            if (this.userScrolling) {
                this.dragging = false;
                this.dragState = {};
                return;
            }
            if (!this.dragging) {
                return;
            }
            this.startTimer();
            this.doOnTouchEnd(event);
            this.dragging = false;
        });
    },
    beforeDestroy() {
        if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    }
};