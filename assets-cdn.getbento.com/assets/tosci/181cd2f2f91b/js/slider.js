(function() {
	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		component = $( '#banner' ),
		items = $('ul.sliderwrap', component).children(),
		current = 0,
		itemsCount = items.length,
		nav = $('nav', component).hide(),
		navNext = $('.next', nav),
		navPrev = $( '.prev', nav),
		isAnimating = false;
	var timerID = 0;

	function init() {
		navNext.click( function( ev ) { ev.preventDefault(); navigate( 'next' ); } );
		navPrev.click( function( ev ) { ev.preventDefault(); navigate( 'prev' ); } );

		timerID = setTimeout(function(){navigate( 'next' )}, 5000);

		component.addClass('slider-wrapper');
		nav.show();
	}

	function navigate( dir ) {
		if( isAnimating ) return false;
		isAnimating = true;
		var cntAnims = 0;

		if(timerID) clearTimeout(timerID);
		timerID = setTimeout(function(){navigate( 'next' )}, 3000);


		var currentItem = items[ current ];

		if( dir === 'next' ) {
			current = current < itemsCount - 1 ? current + 1 : 0;
		}
		else if( dir === 'prev' ) {
			current = current > 0 ? current - 1 : itemsCount - 1;
		}

		var nextItem = items[ current ];

		var onEndAnimationCurrentItem = function() {
			this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
			$(this).removeClass('current' );
			$(this).removeClass(dir === 'next' ? 'navOutNext' : 'navOutPrev' );
			++cntAnims;
			if( cntAnims === 2 ) {
				isAnimating = false;
			}
		}

		var onEndAnimationNextItem = function() {
			this.removeEventListener( animEndEventName, onEndAnimationNextItem );
			$(this).addClass( 'current' );
			$(this).removeClass( dir === 'next' ? 'navInNext' : 'navInPrev' );
			++cntAnims;
			if( cntAnims === 2 ) {
				isAnimating = false;
			}
		}

		if( support.animations ) {
			currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
			nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
		}
		else {
			onEndAnimationCurrentItem();
			onEndAnimationNextItem();
		}

		$(currentItem).addClass( dir === 'next' ? 'navOutNext' : 'navOutPrev' );
		$(nextItem).addClass( dir === 'next' ? 'navInNext' : 'navInPrev' );
	}

	if(itemsCount > 1) init();
})();