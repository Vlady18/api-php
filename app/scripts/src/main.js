 document.addEventListener('DOMContentLoaded', function () {
 $('.burger').on('click', function(){
  $('.mob-menu').addClass('active');
 });
  $('.mob-menu__head-close, .mob-menu a').on('click', function(){
   $('.mob-menu').removeClass('active');
  });

  $('.panel-menu a, .content-inner__hrefs a').on('click', function(e){
    e.preventDefault();
    const data = $(this).attr('href');
    if (!data) return;
    $('.panel-menu a, .content-inner__hrefs a').removeClass('active');
    $('a[href="'+data+'"]').addClass('active');
    $('.panel-content__inner').removeClass('active');
    $('.panel-content__inner[data-panel="'+data+'"]').addClass('active');
  });

  $('.register').on('click', function(e){
  e.preventDefault();
    $('#register').addClass('active');
  });
  $('.login').on('click', function(e){
    e.preventDefault();
    $('#login').addClass('active');
  });

  $('.close-modal').on('click', function(){
    $('.window-popup-container').removeClass('active');
  });





    if(document.querySelector('.slider')){
      $('.slider').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
//        appendDots: '.sdv_dots',
    customPaging: function(slider, i) {
      // this example would render "tabs" with titles
      return '<span class="dot"></span>';
    },
        arrows: true,
        prevArrow: '<div class="prev arrow_carousel"><i class="fa fa-arrow-left"></i></div>',
        nextArrow: '<div class="next arrow_carousel"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>',
        fade: true
      })
    }


});
