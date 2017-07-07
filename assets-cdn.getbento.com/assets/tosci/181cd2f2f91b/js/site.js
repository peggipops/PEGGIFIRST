(function() {
	$(document).ready(function() {
		$('.stretchback').each(function() {
			$(this).backstretch($(this).attr('data-image'));
		});
		$('#btn-hours-location-info').click(function(e) {
			e.preventDefault();
			$('#hours-details').slideToggle(100);
			$(this).toggleClass('up down');
			return false;
		});
		$('#expand-footer').click(function(e) {
			e.preventDefault();
			$('footer .expanded-footer').slideToggle(100);
			$(this).toggleClass('up down');
			if($(this).hasClass('up') ) {
				$(this).text('close');
			} else {
				$(this).text('more');
			}
			return false;
		});
		$('.flavor-button').click(function(e) {
			e.preventDefault();
			$('#today-flavors').slideToggle(200);
			$(this).toggleClass('active');
			return false;
		});
		$('#flavor-close').click(function(e) {
			e.preventDefault();
			$('#today-flavors').slideUp(200);
			$('.flavor-button').removeClass('active');
			return false;
		});
		$('.button.banner-button').click(function(e) {
			if(!$(this).attr('href')) {
				e.preventDefault();
				var $banner = $('.banner-button').parentsUntil('.banner').parent().filter('.banner');
				$('html,body').animate({
				  scrollTop: $banner.next().offset().top
				}, 200);
				return false;
			}
		});
		$('.banner .button.banner-button').hover(
			function(e) {
				$('.banner-button').parentsUntil('.banner').parent().filter('.banner').addClass('hovering');
			},function(e) {
				$('.banner-button').parentsUntil('.banner').parent().filter('.banner').removeClass('hovering');
			}
		);

		$('#mobile-nav').click(function(e) {
			e.preventDefault();
			$(this).toggleClass('active');
			if($(this).hasClass('active')) {
				$('header.mobile-header nav .subnav').hide();
				$('header.mobile-header nav .level0').css('left', 0);
			}
			$('header.mobile-header nav').fadeToggle(200);
			return false;
		});
		$('nav.mobile-nav li.dropdown > .caption').click(function(e) {
			e.preventDefault();
			$(this).siblings('ul.subnav').show();
			$('nav.mobile-nav .level0').animate({
				left: '-=100%'
			}, 100);
			return false;
		});
		$('nav.mobile-nav li.nav-back').click(function(e) {
			e.preventDefault();
			var thisobj = this;
			$('nav.mobile-nav .level0').animate({
				left: '+=100%'
			}, 100, function() {
				$(thisobj).parent('ul.subnav').hide();
			});
			return false;
		});
		$('body').click(function(e) {
			if($('nav.mobile-nav:visible').length && !$(e.target).is('nav.mobile-nav a')) {
				$('#mobile-nav').removeClass('active');
				$('header.mobile-header nav').fadeOut(200);
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		});
		$('.button.signup-button').click(function(e) {
			e.preventDefault();
			$('#mc_embed_signup').css('margin-top',Math.max(($(window).height()-230)/2-80, 0));
			$('.mc-signup-overlay').fadeIn();
			return false;
		});
		$('#signup-close').click(function(e) {
			e.preventDefault();
			$('.mc-signup-overlay').fadeOut();
			return false;
		});

		$('ul.navigation a').each(function() {
			if(cur_page_url == $(this).attr('href')) $(this).addClass('active').parent().addClass('active');
		});

		$('ul.navigation .dropdown').each(function() {
			if($('.subnav .active', this).length) {
				$(this).addClass('active');
			}
		});
	});
})(jQuery);
