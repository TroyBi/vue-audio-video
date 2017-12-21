import Carousel from './src/main.js';

Carousel.install = function (Vue) {
    Vue.component(Carousel.name, Carousel);
};

export default Carousel;