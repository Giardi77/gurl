(function ($) {
	Drupal.behaviors.ibermenu = {
	attach: function (context, settings) {	
		$('.ib-menu li.ib-depth-1', context).hover(
		function () {
			if (!$("body").hasClass('responsive-layout-mobile') && $("html").hasClass("no-touch")) {
				var $wrapperWidth = 1100;
				var $regionWidth = 1200;
				if ($('#region-menu')) $regionWidth = $('#region-menu').width();
				if ($('#nav-main')) $regionWidth = $('#nav-main').width();
				if ($('#navbarNav')) $regionWidth = $('#navbarNav').width();
				//alert($('#navbarNav').width());
				if ($(this).hasClass('ib-megamenu-columns-enable')) 
					$wrapperWidth =	$regionWidth - 20;
				$(this).children('.ib-megamenu-wrapper').width($wrapperWidth);
				$(this).children('.ib-megamenu-wrapper').stop(true, true).delay(50).slideDown(600);	 
				$(this).find('.field-type-text-with-summary').css('margin-right',$(this).find('img').width() + 30);
				$(this).addClass('ib-active');	
				$(this).find('a').first().addClass('child-hover-behavior');
			}
		},
		function () {
			if (!$("body").hasClass('responsive-layout-mobile') && $("html").hasClass("no-touch")) {	
				$(this).removeClass('ib-active');
				$(this).children('.ib-megamenu-wrapper').stop(true, true).slideUp(100);
				$(this).find('a').first().removeClass('child-hover-behavior');
			}
		}
		);
		$('.ib-menu li.ib-depth-1', context).focusin(
		function () {
			if (!$("body").hasClass('responsive-layout-mobile') && $("html").hasClass("no-touch")) {
				var $wrapperWidth = 1100;
				var $regionWidth = 1200;
				if ($('#region-menu')) $regionWidth = $('#region-menu').width();
				if ($('#nav-main')) $regionWidth = $('#nav-main').width();
				if ($('#navbarNav')) $regionWidth = $('#navbarNav').width();
				//alert($('#navbarNav').width());
				if ($(this).hasClass('ib-megamenu-columns-enable')) 
					$wrapperWidth =	$regionWidth - 20;
				$(this).children('.ib-megamenu-wrapper').width($wrapperWidth);
				$(this).children('.ib-megamenu-wrapper').stop(true, true).delay(1).show();	 
				$(this).find('.field-type-text-with-summary').css('margin-right',$(this).find('img').width() + 30);
				$(this).addClass('ib-active');	
			}
		}
		);
		$('.ib-menu li.ib-depth-1', context).focusout(
		function () {
			if (!$("body").hasClass('responsive-layout-mobile') && $("html").hasClass("no-touch")) {	
				$(this).removeClass('ib-active');
				$(this).children('.ib-megamenu-wrapper').stop(true, true).hide(2);
			}
		}
		);
	
		//$('.ib-menu li.ib-depth-1').children("span.ib-depth-1").click(
		//function (e) {
		//	if (!$("body").hasClass('responsive-layout-mobile') && $("html").hasClass("touch")) {	
		//		if ($(this).parent("li.ib-depth-1").children('.ib-megamenu-wrapper').length) e.preventDefault();
		//		e.stopPropagation();
		//		var $wrapperWidth = 230;
		//		var $regionWidth = 1200;
		//		if ($('#region-menu')) $regionWidth = $('#region-menu').width();
		//		if ($('#nav-main')) $regionWidth = $('#nav-main').width();
		//		if ($(this).parent("li.ib-depth-1").hasClass('ib-megamenu-columns-enable')) 
		//			$wrapperWidth =	$regionWidth - 20;
		//		$(this).parent("li.ib-depth-1").children('.ib-megamenu-wrapper').width($wrapperWidth);
		//		$(this).parent("li.ib-depth-1").find('.field-type-text-with-summary').css('margin-right',$(this).parent("li.ib-depth-1").find('img').width()+30);		
		//		
		//		if($(this).parent("li.ib-depth-1").hasClass("ib-active")) {
		//			$(this).parent("li.ib-depth-1").removeClass("ib-active");
		//			$('.ib-active').children('.ib-megamenu-wrapper').hide();
		//			$(this).parent("li.ib-depth-1").addClass("ib-active");
		//		} else {
		//			$('.ib-active').children('.ib-megamenu-wrapper').hide();
		//			$('.ib-active').removeClass("ib-active");			
		//		}
		//		$(this).parent("li.ib-depth-1").toggleClass("ib-active"); 
		//		$(this).parent("li.ib-depth-1").children('.ib-megamenu-wrapper').slideToggle(400);
		//	}	
		//}
		//);	
		
		$('.ib-mobile', context).closest(".block-ibermenu").find('h2').click(
		function () {
			 if ($("body").hasClass('responsive-layout-mobile')) {	 
				var $wrapperWidth = $(window).width();
				$(this).parent().find('.ib-megamenu-wrapper').width($wrapperWidth);
				if($(this).parent().find('.ib-mobile').hasClass("ib-primo-piano")) {
					$(this).parent().find('.ib-mobile').removeClass("ib-primo-piano");
					$('.ib-primo-piano').hide();
					$(this).parent().find('.ib-mobile').addClass("ib-primo-piano");
				} else {
					$('.ib-primo-piano').hide();
					$('.ib-primo-piano').removeClass("ib-primo-piano");			
				}
				$(this).parent().find('.ib-mobile').toggleClass("ib-primo-piano");		
				$(this).parent().find('.ib-mobile').slideToggle(400);	
			}
		}
		); 
		
		$( window ).resize(
		function() {		
			if (!$("body").hasClass('responsive-layout-mobile')) {
				$('.ib-mobile').show();
			} else {
				$('.ib-mobile').hide();	
			}
		}
		);		
	
		//function afterOWLaction() {
		//	$cur = '#block-views-focus-on-profilo-block .owl-slide-'+this.currentItem;
		//	$('#block-views-focus-on-profilo-block .attachment li.views-row').removeClass('active');
		//	$($cur).parent().addClass('active');
		//}
        //
		//function afterOWLinit() {
		//	$('#block-views-focus-on-profilo-block .attachment li.views-row-1').addClass('active');
		//}
        //
        //
		//var callbacks = {afterAction: afterOWLaction, afterInit: afterOWLinit};
        //
		//for (var carousel in settings.owlcarousel) {
		//	if (carousel == 'owl-carousel-block119' || carousel == 'owl-carousel-block120' ) {
		//		$.extend(true, settings.owlcarousel[carousel].settings, callbacks);
		//	}		
		//}
	}

	};
})(jQuery);