import CarouselItem from '../carousel/src/item.js';

CarouselItem.install = function(Vue) {
  Vue.component(CarouselItem.name, CarouselItem);
};

export default CarouselItem;