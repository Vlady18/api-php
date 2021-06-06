 document.addEventListener('DOMContentLoaded', function () {
   document.addEventListener("click", x=>0);
    $('#preloader').fadeOut();
     if(document.querySelector('#fullpage')){
        $('.header').addClass('header-main');
         $('#fullpage').fullpage({
             //options here
             // autoScrolling: true,
             scrollOverflow: true,
             licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
             fixedElements: '.s_popup #preloader',
             sectionSelector: '.js-fullpage-section',
             anchors:['main', 'publishers', 'advertisers', 'contacts'],
             onLeave: function(origin, destination, direction){
               if(destination.anchor === 'contacts' ) {
                 $('.header').fadeOut();
               } else {
                 $('.header').fadeIn();
               }
             },
             // normalScrollElements: '.contacts .container'
         });
         //methods
         // $.fn.fullpage.setAllowScrolling(false);
     } else {
       $('.header').addClass('header--pages');
       $('.menu').addClass('menu--pages');
       function checkHeader() {
         if(window.scrollY > 50) {
           $(".header").addClass('header--fixed');
         } else {
           $(".header").removeClass('header--fixed');
         }
       }
       checkHeader();
       $(window).on('scroll', checkHeader)
     }

    //svg inliner
    new SVGInliner(document.querySelectorAll(".svg-to-inline"), function () {});

   // header calc
  //  function calcHeader() {
  //   if(document.querySelector('.js-header-calc')){
  //     $('.js-header-calc').css('paddingTop',$('.s_header').outerHeight());
  //   }
  // }
  // calcHeader();
  // $(window).on('resize',function(){
  //   setTimeout(calcHeader,100);
  // })
  // $(window).on('load',function(){
  //   setTimeout(calcHeader,100);
  // })


   //validation
   $.validator.addMethod("plus", function (value, element) {
     var Reg61 = new RegExp("^.*[^+-/(/)1234567890 ].*$");
     return !Reg61.test(value);
   });
   $.validator.addMethod("correctPassword", function(value, element) {
       if (value === $('input[name="Password"]').val()){
         return true;
       }
       else {
         return false;
       }
         },
         "Пароли должны совпадать")

   $.validator.addMethod("notnumbers", function (value, element) {
     var Reg61 = new RegExp("^.*[^A-zА-яЁёіЇїЄєҐґ ].*$");
     return !Reg61.test(value);
   });
   //add validation rules
   var rules = {
     email: {
       required: true,
       email: true,
     },
     name: {
       required: true,
       notnumbers: true,
       minlength: 2,
     },
     company: {
       required: true,
       notnumbers: true,
       minlength: 2,
     },
     phone: {
       required: true,
       plus: true,
       minlength: 10
       // digits: true,
     },
     message: {
       required: false,
       minlength: 2,
     }
   }
   var messages = {
     email: {
       required: $('input[name="email"]').attr('data-error'),
       email: $('input[name="email"]').attr('data-error'),
     },
     name: {
       required: $('input[name="name"]').attr('data-error'),
       minlength: $('input[name="name"]').attr('data-error'),
       notnumbers: $('input[name="name"]').attr('data-error'),
     },
     company: {
       required: $('input[name="company"]').attr('data-error'),
       minlength: $('input[name="company"]').attr('data-error'),
       notnumbers: $('input[name="company"]').attr('data-error'),
     },
     message: {
       required: $('textarea[name="message"]').attr('data-error'),
       minlength: $('textarea[name="message"]').attr('data-error'),
       notnumbers: $('textarea[name="message"]').attr('data-error'),
     },
   };

   // validation example
    if (document.querySelector('#js-contacts-form')) {
      let form = $('#js-contacts-form');
      form.validate({
        rules: rules,
        highlight: function (element, errorClass) {
          $(element).parent().addClass('input--error');
        },
        unhighlight: function (element, errorClass) {
          $(element).parent().removeClass('input--error');
        },
        messages: messages,
        submitHandler: function submitHandler(form) {
          $('#preloader').fadeIn();
          $('body').addClass('body-overflow');
          const action = $('#js-subscribe-form').attr('data-action')
          $.post('/wp-admin/admin-ajax.php?action=' + action, {
            type: $('#js-contacts-form').attr('data-type'),
            name: $(form).find('input[name="name"]').val(),
            email: $(form).find('input[name="email"]').val(),
            company: $(form).find('input[name="company"]').val(),
            message: $(form).find('textarea').val()
          }).done(function (data) {
            popupthanks();
            const validator = $('#js-contacts-form').validate();
            validator.resetForm();
            document.querySelector('#js-contacts-form').reset();
          }).always(function () {
            // preloader
            $('#preloader').fadeOut();
            $('body').removeClass('body-overflow');
          });
        }
      })
    }

    if (document.querySelector('#js-subscribe-form')) {
      let form = $('#js-subscribe-form');
      form.validate({
        rules: rules,
        highlight: function (element, errorClass) {
          $(element).parent().addClass('input--error');
        },
        unhighlight: function (element, errorClass) {
          $(element).parent().removeClass('input--error');
        },
        messages: messages,
        submitHandler: function submitHandler(form) {
          $('#preloader').fadeIn();
          $('body').addClass('body-overflow');
          const action = $('#js-subscribe-form').attr('data-action')
          $.post('/wp-admin/admin-ajax.php?action=' + action, {
            type: $('#js-subscribe-form').attr('data-type'),
            email: $(form).find('input[name="email"]').val(),
          }).done(function (data) {
            subscriptionthanks();
            const validator = $('#js-subscribe-form').validate();
            validator.resetForm();
            document.querySelector('#js-subscribe-form').reset();
          }).always(function () {
            // preloader
            $('#preloader').fadeOut();
            $('body').removeClass('body-overflow');
          });
        }
      })
    }

    //popup thank
  function popupthanks(){
    $('body').addClass('body-overflow');
    $('.s_popup').fadeOut();
    // dont forget to clear forms
    $('.s_popup--thanks').fadeIn();
    setTimeout(function(){
      $('.s_popup--thanks').fadeOut();
      $('body').removeClass('body-overflow');
    },3000)
  }

  function subscriptionthanks(){
    $('body').addClass('body-overflow');
    $('.s_popup').fadeOut();
    // dont forget to clear forms
    $('.s_popup--subscription').fadeIn();
    setTimeout(function(){
      $('.s_popup--subscription').fadeOut();
      $('body').removeClass('body-overflow');
    },3000)
  }

  // js-close popup
  if(document.querySelector('.js-popup-close')){
    $('.js-popup-close').click(function(){
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      // dont forget to clear forms
    })
  }

  // popupmore
  $('.s_popup').mouseup(function (e) {
    var content = $('.s_popup_content');
    if (!content.is(e.target) && content.has(e.target).length === 0) {
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      //clear forms
      var validator = $('#yourformid').validate();
      validator.resetForm();
      document.querySelector('#yourformid').reset();
    }
  });

  function inWindow(s){
     var scrollTop = $(window).scrollTop();
     var viewportBottom = scrollTop + $(window).height();

     var windowHeight = $(window).height();
     var currentEls = $(s);
     var result = [];
     currentEls.each(function(){
       var el = $(this);
       var offset = el.offset();
       if( (el.outerHeight() + offset.top) > scrollTop && offset.top <  viewportBottom){
         result.push(this);
       }
     });
     return $(result);
   }

   if(document.querySelector('.site-input')){
      $('.site-input input, .site-input textarea').focus(function(){
        const value = $(this).val();
        $(this).parent().removeClass('site-input--unfocus');
        if(value.length == 0){
          $(this).parent().addClass('site-input--focus');
        }
      }).focusout(function(){
        const value = $(this).val();
        if(value.length == 0){
          $(this).parent().removeClass('site-input--focus');
        } else {
          $(this).parent().addClass('site-input--unfocus');
        }
      })
    }

    if(document.querySelector('.js-to-top')) {
      $('.js-to-top').click(function () {
        if(document.querySelector('#fullpage')) {
          fullpage_api.moveTo('main', 0);
        } else {
          const body = $("html, body");
          body.stop().animate({ scrollTop: 0 }, 500, 'swing');
        }
      });
    }

    if(document.querySelector('.js-burger')){
      $('.js-burger').on('click', function () {
        $('body').addClass('body-overflow');
        $('.menu').fadeIn();
      })
    }
    if(document.querySelector('.js-close')){
      $('.js-close').on('click', function () {
        $('body').removeClass('body-overflow');
        $('.menu').fadeOut();
      })
    }

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

    if(document.querySelector('.js-sdv-slider')){
      $('.js-results-slider').slick({
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        fade: true
      })
    }

    if(document.querySelector('.tools')){
      const blue = document.querySelectorAll('.tools_progress--blue');
      for (var i = 0; i < blue.length; i++) {
        new ProgressBar.Circle(blue[i], {
            color: '#2041F8',
            duration: 0,
            easing: 'easeInOut',
            strokeWidth: 1
        }).animate(1);
      }
      const green = document.querySelectorAll('.tools_progress--green');
      for (var i = 0; i < green.length; i++) {
        new ProgressBar.Circle(green[i], {
            color: '#2CF2AE',
            duration: 0,
            easing: 'easeInOut',
            strokeWidth: 1
        }).animate(0.95);
      }
    }

    if(document.querySelector('.js-serve-slider')){
      $('.js-serve-slider').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: '.serve_arrow--left',
        nextArrow: '.serve_arrow--right',
        fade: true
      })
    }

    if(document.querySelector('.js-posts-slider')){
      $('.js-posts-slider').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      })
    }

    if(document.querySelector('.js-devices-slider')){
      $('.js-devices-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.js-device-slide').removeClass('active');
        $('.js-device-slide').eq(nextSlide).addClass('active');
        const allVideos = $('.js-devices-slider  video');
        for (var i = 0; i < allVideos.length; i++) {
          $(allVideos)[i].pause();
        }
      });
      $('.js-devices-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        const arr = $('.js-devices-slider .slick-active video');
        for (var i = 0; i < arr.length; i++) {
          $(arr)[i].play();
        }
      });
      $('.js-device-slide').on('click', function(){
        $('.js-devices-slider').slick('slickGoTo', $(this).data('slide'));
      })
      $('.js-devices-slider').on('init', function(){
        const arr = $('.js-devices-slider .slick-active video');
        for (var i = 0; i < arr.length; i++) {
          $(arr)[i].play();
        }
      })
      $('.js-devices-slider').slick({
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true
      })
    }

    if(document.querySelector('.js-nav')){
      const elements = $('.js-nav');
      function checkPos() {
        const prev = $('.navbar_item.active');
        $('.navbar_item').removeClass('active');
        const result = inWindow(elements);
        if(result.length === 0) {
          $(prev).addClass('active')
        } else {
          $('.navbar_item[href="#'+$(result).eq(result.length - 1).attr('id')+'"]').addClass('active')
        }
      }
      checkPos();
      $(window).on('scroll', checkPos);
    }

    // if(document.querySelector('.js-section')) {
    //   const sections = $('.js-section');
    //   function checkSection() {
    //     if(window.scrollY > 40) {
    //       $('.header').addClass('header--fixed');
    //     } else {
    //       $('.header').removeClass('header--fixed');
    //     }
    //     console.log(inWindow(sections));
    //     const result = inWindow(sections);
    //     if(result.length === 0) {
    //       // $(prev).addClass('active')
    //     } else {
    //       $('.header').removeClass('header--white');
    //       $('.header').removeClass('header--blue');
    //       $('.header').addClass($(result).eq(0).data('color'));
    //     }
    //
    //   }
    //   checkSection();
    //   $(window).on('scroll', checkSection);
    // }

    if(document.querySelector('.js-scroll-to-section')){
      $('.js-scroll-to-section').on('click', function(e){
        e.preventDefault;
        const id = $(this).attr('href');
        const body = $("html, body");
        body.stop().animate({ scrollTop: $(id).offset().top }, 500, 'swing');
      })
    }

    if(document.querySelector('.wow')){
      new WOW().init();
    }

    if(document.querySelector('.js-show-more-jobs')){
      $('.js-show-more-jobs').on('click', function(e){
        e.preventDefault;
        const action = $(this).data('action');
        $('#preloader').fadeIn();
        $('body').addClass('body-overflow');
        $.get('/wp-admin/admin-ajax.php?action=' + action, {
        }).done(function (result) {
          $('.jobs_items').append(result);
          $('.jobs_more').fadeOut();
        }).always(function () {
          // preloader
          $('#preloader').fadeOut();
          $('body').removeClass('body-overflow');
        });
      })
    }

});
