// COMMENTS SLIDER
const commentsSlider = new Swiper('.comments-slider', {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.comments-slider-next',
    prevEl: '.comments-slider-prev',
  },
  pagination: {
    el: '.comments-slider-pagination',
    type: 'bullets',
    clickable: true,
  },
});
