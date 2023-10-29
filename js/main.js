'use strict';

(function ($) {
"use strict";

	

	/**
   * [isMobile description]
   * @type {Object}
   */
	window.isMobile = {
		Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function any() {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		}
	};
	window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	window.windowHeight = window.innerHeight;
	window.windowWidth = window.innerWidth;

	/**
   * Match height 
   */
	$('.row-eq-height > [class*="col-"]').matchHeight();

	var myEfficientFn = debounce(function () {
		$('.row-eq-height > [class*="col-"]').matchHeight();
	}, 250);

	window.addEventListener('resize', myEfficientFn);

	// Wow js
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 100,
		mobile: false,
		live: false
	});
	$(window).on('load', function () {
		wow.init();
	});

	/**
   * [debounce description]
   * @param  {[type]} func      [description]
   * @param  {[type]} wait      [description]
   * @param  {[type]} immediate [description]
   * @return {[type]}           [description]
   */
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				    args = arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	
	/**
   * ProgressBar
   */
	var progress = $('.progress');

	progress.each(function () {

		var _self = $(this);
		var progressNumber = _self.find('.progress__number');
		progressNumber.text('0%');

		_self.waypoint(function (direction) {
			var progressBar = _self.find('.progress__bar'),
				    delay = progressBar.data("delay"),
				    durations = progressBar.data("duration"),
				    timing = progressBar.data("timing"),
				    getPercent = progressBar.data('progress-percent');

			console.log(durations);

			progressBar.css({
				'width': getPercent + '%',
				'transition': 'all ' + durations + 'ms ' + timing,
				'transition-delay': delay + 'ms'
			});

			setTimeout(function () {
				progressNumber.prop('Counter', 0).animate({
					Counter: getPercent
				}, {
					duration: durations,
					easing: 'swing',
					step: function step(now) {
						$(this).text(Math.ceil(now) + '%');
					}
				});
			}, delay);

			this.destroy();
		}, {
			offset: function offset() {
				return Waypoint.viewportHeight() - _self.outerHeight() - 150;
			}
		});
	});

	var smokyBG = $('#smoky-bg').waterpipe({
		gradientStart: '#51ff00',
		gradientEnd: '#001eff',
		smokeOpacity: 0.1,
		smokeSize: 100,
		numCircles: 1,
		maxMaxRad: 'auto',
		minMaxRad: 'auto',
		minRadFactor: 0,
		iterations: 8,
		drawsPerFrame: 10,
		lineWidth: 2,
		speed: 10,
		bgColorInner: "#111",
		bgColorOuter: "#000"
	});
	/**
   * Swiper
   */
	$('.swiper__module').each(function () {
		var self = $(this),
			    wrapper = $('.swiper-wrapper', self),
			    optData = eval('(' + self.attr('data-options') + ')'),
			    optDefault = {
			paginationClickable: true,
			pagination: self.find('.swiper-pagination-custom'),
			nextButton: self.find('.swiper-button-next-custom'),
			prevButton: self.find('.swiper-button-prev-custom'),
			spaceBetween: 30
		},
			    options = $.extend(optDefault, optData);
		wrapper.children().wrap('<div class="swiper-slide"></div>');
		var swiper = new Swiper(self, options);

		function thumbnails(selector) {

			if (selector.length > 0) {
				var wrapperThumbs = selector.children('.swiper-wrapper'),
					    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
					    optDefaultThumbs = {
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.3,
					slideToClickedSlide: true,
					pagination: selector.find('.swiper-pagination-custom'),
					nextButton: selector.find('.swiper-button-next-custom'),
					prevButton: selector.find('.swiper-button-prev-custom')
				},
					    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
				wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
				var swiperThumbs = new Swiper(selector, optionsThumbs);
				swiper.params.control = swiperThumbs;
				swiperThumbs.params.control = swiper;
			}
		}
		thumbnails(self.next('.swiper-thumbnails__module'));
	});

	/**
   * Tabs
   */
	$('.tabs__module').each(function () {
		var self = $(this),
			    optData = eval('(' + self.attr('data-options') + ')'),
			    optDefault = {
			active: 0,
			activeEvent: 'click',
			navigatorPosition: 'top'
		},
			    options = $.extend(optDefault, optData);
		self.aweTabs(options);
	});

	$('.video .popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	/**
  * Footer
  */

	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
	//*
	// Header
	//*


	var wh = $(window).height(),
		    half = wh / 2,
		    headerHeight = $('header').outerHeight();

	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= half) {
			$('header').addClass('is-scroll');
		} else {
			$('header').removeClass('is-scroll');
		}
	});

	$('.onepage-nav').dropdownMenu({
		menuClass: 'onepage-menu',
		breakpoint: 1200,
		toggleClass: 'active',
		classButtonToggle: 'navbar-toggle',
		subMenu: {
			class: 'sub-menu',
			parentClass: 'menu-item-has-children',
			toggleClass: 'active'
		}
	});

	$('.onepage-nav').onePageNav({
		currentClass: 'current-menu-item',
		scrollOffset: headerHeight
	});

	//*
	// Back to top
	//*

	$(window).scroll(function () {
		var wh = $(window).height(),
			    scrollTop = $(window).scrollTop();

		if (scrollTop >= wh) {
			$('#back-to-top').addClass('is-visible');
		} else {
			$('#back-to-top').removeClass('is-visible');
		}
	});

	var headerHeight = $('header').outerHeight();

	$('#back-to-down').on('click', function () {
		var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

		$('html,body').animate({
			scrollTop: offsets
		}, 700);
	});
	
})(jQuery);