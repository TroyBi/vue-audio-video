const CARD_SCALE = 0.83;
export default {
    template: `
<div v-show="ready"
    class="mpi-carousel__item"
    :class="{
      'is-active': active,
      'mpi-carousel__item--card': $parent.type === 'card',
      'mpi-carousel__item--space': $parent.type === 'space',
      'is-in-stage': inStage,
      'is-hover': hover
    }"
    :style="{
      msTransform: 'translateX(' +  translate + 'px) scale(' + scale + ')',
      webkitTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
      transform: 'translateX(' + translate + 'px) scale(' + scale + ')'
    }">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="mpi-carousel__mask">
    </div>
    <slot></slot>
  </div>`,
    name: 'MpiCarouselItem',
    props: {
        name: String,
        label: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            hover: false,
            translate: 0,
            scale: 1,
            active: false,
            ready: false,
            inStage: false
        };
    },
    methods: {
        processIndex(index, activeIndex, length) {
            if (activeIndex === 0 && index === length - 1) {
                return -1;
            } else if (activeIndex === length - 1 && index === 0) {
                return length;
            } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
                return length + 1;
            } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
                return -2;
            }
            return index;
        },
        calculateTranslate(index, activeIndex, parentWidth) {
            if (this.inStage) {
                return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
            } else if (index < activeIndex) {
                return -(1 + CARD_SCALE) * parentWidth / 4;
            } else {
                return (3 + CARD_SCALE) * parentWidth / 4;
            }
        },
        calculateSpaceTranslate(index, activeIndex, parentWidth) {
            if (index - activeIndex === -1) {
                return -parentWidth * 73 / 100;
            } else if (index - activeIndex === 0) {
                return parentWidth * 10 / 100;
            } else {
                return parentWidth * 93 / 100;
            }
        },
        translateItem(index, activeIndex) {
            const parentWidth = this.$parent.$el.offsetWidth;
            const length = this.$parent.items.length;
            if (index !== activeIndex && length > 2) {
                index = this.processIndex(index, activeIndex, length);
            }
            if (this.$parent.type === 'card') {
                this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
                this.active = index === activeIndex;
                this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
                this.scale = this.active ? 1 : CARD_SCALE;
            } else if (this.$parent.type === 'space') {
                this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
                this.active = index === activeIndex;
                this.translate = this.calculateSpaceTranslate(index, activeIndex, parentWidth);
                this.scale = 1;
            }
             else {
                this.active = index === activeIndex;
                this.translate = parentWidth * (index - activeIndex);
            }
            this.ready = true;
        },
        handleItemClick() {
            const parent = this.$parent;
            if (parent && parent.type === 'card') {
                const index = parent.items.indexOf(this);
                parent.setActiveItem(index);
            }
            if (parent && parent.type === 'space') {
                const index = parent.items.indexOf(this);
                parent.setActiveItem(index);
            }
        }
    },
    created() {
        this.$parent && this.$parent.updateItems();
    },
    destroyed() {
        this.$parent && this.$parent.updateItems();
    }
};