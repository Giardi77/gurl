(function ($,Drupal) {

  /**
   * try - catch, per esserne certi
   * che questo script non blocca tutti gli altri nel sito.
   *
   * In questo caso, nel backend, non viene riconosciuto
   * $().on() e romperebbe le viste in edit.
   */
  Drupal.behaviors.degreecourse_ricerca = {
    attach: function(context,settings) {
        try{
          capitalize_autocomplete_results();
          hide_views_field_if_no_results();
          adjust_second_view_row_odd_even();
          clear_filters();
          advanced_search_collapse_behavior(context);
        }catch(error){}
      $(document).ajaxComplete(function(){
        try{
          capitalize_autocomplete_results();
          hide_views_field_if_no_results();
          adjust_second_view_row_odd_even();
          clear_filters();
          advanced_search_collapse_behavior(context);
        }catch(error){}
      });

    },
    dettach: function(context,settings) {},
  }

  clear_filters = function(){
    $(document).on("removeArgs",function(event){
      $('body').append('<div id="overlay-block"></div>');
      // var currentURL = window.location.origin + '/ricerca-insegnamenti/';
      var currentURL = window.location.href;
      window.open(currentURL,'_self');
    });
    if(!$('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length){
      $(document).delegate('.views-reset-button .form-submit','click',function(event){
              event.preventDefault();
              $('form').each(function(){
                $('form select option').removeAttr('selected');
                $('form input[type=text]').attr('value', '');
                this.reset();
              });
              $(document).trigger('removeArgs');
              return false;
      });
    }
  }
  advanced_search_collapse_behavior = function(context){
    $('fieldset.collapsible', context).find('.form-item.form-type-select').each(function(){
      var $select = $(this).find('select');
      if( $select.children(":selected").val() !== 'All'){
        $select.closest('fieldset.collapsible').removeClass('collapsed');
        return false;
      }
    });
  }
  capitalize_autocomplete_results = function(){
    if($('#autocomplete').length){
      $('#autocomplete .reference-autocomplete').text(function(index,currentText){
        return currentText.toUpperCase();
      });
    }
  }
  capitalize_autocomplete_results = function(){
    if($('#autocomplete').length){
      $('#autocomplete .reference-autocomplete').text(function(index,currentText){
        return currentText.toUpperCase();
      });
    }
  }

  hide_views_field_if_no_results = function(){
    if($('.no-results').length){
      $('.no-results').each(function(){
        $(this).closest('.views-field.views-field-af-id').remove();
      });
    }
  }
  adjust_second_view_row_odd_even = function(){
    var elem = $('.view-offerta-formativa-erogata-research .view-ugov-view-degreeprofessor .views-row');
    elem.each(function(){
      $(this).removeClass('views-row-odd').removeClass('views-row-even');
      if($(this).closest('.views-row').hasClass('views-row-odd')){
        $(this).addClass('views-row-odd');
      }else{
        $(this).addClass('views-row-even');
      }
    })
  }


})(jQuery,Drupal);
;
(function ($) {

  /**
   * Google CSE utility functions.
   */
  Drupal.googleCSE = Drupal.googleCSE || {};

  Drupal.behaviors.googleCSE = {
    attach: function (context, settings) {
      // Show watermark, if not disabled in module settings.
      if (Drupal.settings.googleCSE.showWaterMark) {
        Drupal.googleCSE.googleCSEWatermark('#search-block-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#search-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#google-cse-results-searchbox-form', context);
      }
    }
  };

  /**
   * Show google CSE watermark.
   */
  Drupal.googleCSE.googleCSEWatermark = function(id, context) {
    var f = $(id, context)[0];
    if (f && (f.query || f['edit-search-block-form--2'] || f['edit-keys'])) {
      var q = f.query ? f.query : (f['edit-search-block-form--2'] ? f['edit-search-block-form--2'] : f['edit-keys']);
      var n = navigator;
      var l = location;
      if (n.platform == 'Win32') {
        q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
      }
      var b = function () {
        if (q.value == '') {
          q.style.background = '#FFFFFF url(https://www.google.com/cse/intl/' + Drupal.settings.googleCSE.language + '/images/google_custom_search_watermark.gif) left no-repeat';
        }
      };
      var f = function () {
        q.style.background = '#ffffff';
      };
      q.onfocus = f;
      q.onblur = b;
//      if (!/[&?]query=[^&]/.test(l.search)) {
      b();
//      }
    }
  };

})(jQuery);
;
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
})(jQuery);;
(function ($,Drupal) {
	Drupal.behaviors.plscuole = {
	    attach: function(context,settings) {
			   // plscuole_views_exposed_form_alter_position(context,settings);      
	    },
	    dettach: function(context,settings) {},
    }
    plscuole_views_exposed_form_alter_position = function(context,settings){
      try{
      		
      }catch(error){
        console.warn(error);
      }
    }

})(jQuery,Drupal);;
