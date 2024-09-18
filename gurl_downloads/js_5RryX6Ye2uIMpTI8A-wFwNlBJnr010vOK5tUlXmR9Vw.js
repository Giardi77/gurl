(function ($,Drupal) {
	Drupal.behaviors.imageCredits = {
	    attach: function(context,settings) {
			   imageCreditsInit();
			   imageCreditsBehavior();
	    },
	    dettach: function(context,settings) {},
    }
    imageCreditsInit = function(){
      try{
        $(document).find('img').each(function(){
		if($(this).is('[data-credits]')){
			var toggler = attachCreditsHtml($(this).data('credits'));
                if($(this).parent('a').length > 0){
				$(this).parent('a').after(toggler);
                }else{
                    $(this).after(toggler);
                }
                alter_wrapper_css_on_mobile();
		}
        });
      }catch(error){
        console.warn(error);
      }
    }
    alter_wrapper_css_on_mobile = function(){
        if ($(window).width() < 700){
            var imageHeight = $('.carousel-inner .item.active img').outerHeight() + 20;
            $('.credits-wrapper').css('bottom',imageHeight);
        }
    }
    attachCreditsHtml = function(msg){
	var out = '<div class="credits-wrapper">';
	out += '<span class="credits">'+msg+'</span>';
	out += '<span class="credits-handler material-icons">copyright</span>';
	out += '</div>'
	return out;
    }
    imageCreditsBehavior = function(){
        try{
		$(document).on('click','.credits-handler',function(){
                var imgWidth = 0;
                if($(this).parent().prev('img').length){
                  imgWidth = $(this).parent().prev('img').attr('width');
                }else if($(this).parent().prev('a').children('img').first().length){
                  imgWidth = $(this).parent().prev('a').children('img').first().attr('width');
                }

                var maxWidth = 512;
                var disc = 40;
                var dec = (disc / 100).toFixed(2);
                var mult = imgWidth * dec;
                var discount = Math.ceil(imgWidth - mult);
                if(discount > maxWidth){
                    maxWidth = discount;
                }
			$(this).prev('span.credits').toggleClass('credits-show');
                $(this).parent().toggleClass('credits-wrapper-active');
                $(this).parent().css("maxWidth", maxWidth);
                $(this).toggleClass('credits-handler-active');
		});
        }catch(error){console.warn(error);}
    }

})(jQuery,Drupal);;
// We define a function that takes one parameter named $.
(function ($) {
    // Use jQuery with the shortcut:
    //console.log($.browser);
    // Here we immediately call the function with jQuery as the parameter.

    $(document).on('click', '.ui-icon.ui-icon-closethick', function () {
        $(this).parent('.ui-dialog.ui-widget.ui-widget-content').remove();
    });

})(jQuery);

jQuery(document).ready(function ($) {


    //****************************************************************************//
    // gestione del menu sticky
    $(window).scroll(function () {
        var stickyheader = $('.header');
        var scroll = $(window).scrollTop();

        if (scroll >= 140) stickyheader.addClass('sticky');
        else stickyheader.removeClass('sticky');
    });

    //////questa versione non funziona perchï¿½ height restituisce 0
    //	$(window).scroll(function(){
    //		var toolbar = 0;
    //		if ($(".region-page-top").length) {
    //			toolbar=$(".region-page-top").height(); //eventuale toolbar
    //			alert(toolbar);
    //			if (toolbar == 0) toolbar=64;
    //		}
    //		
    //		var stickyheader = $('.header');
    //		var scroll = $(window).scrollTop();
    //		
    //		if (scroll >= 140) {
    //			stickyheader.addClass('sticky');
    //			stickyheader.css("padding-top", toolbar );
    //		}
    //		else {
    //			stickyheader.removeClass('sticky');
    //			stickyheader.css("padding-top",0);
    //		}
    //	});
    //****************************************************************************//




    /////////nella nuova grafica la "data in ogni pagina" non ï¿½ piï¿½ prevista (per il momento per il www)
    /////    var dayofweek = ['Luned&igrave;','Marted&igrave;', 'Mercoled&igrave;', 'Gioved&igrave;', 'Venerd&igrave;', 'Sabato', 'Domenica'];
    /////    var today = new Date();
    /////    $curdate = today.toLocaleDateString();
    /////    $letterday = dayofweek[today.getDay()-1];
    /////    if($('body').hasClass("wwwen")) { $letterday = '';$curdate = today.toDateString();}
    /////    $('body').prepend('<div id="datebar">'+$letterday+' '+$curdate+'</div>');


    ///////// nella nuova grafica la "region-menu non sembra esistere piï¿½
    ////    $('.region-menu h2').click(function(){
    ////        $(this).parent().children('.content').addClass('toggled');
    ////        if ($(this).parent().children('.content').hasClass('menu-closed') || !$(this).parent().children('.content').hasClass('menu-open')) {
    ////            $(this).parent().children('.content').removeClass('menu-closed');
    ////            $(this).parent().children('.content').addClass('menu-open');return;
    ////        }
    ////        if ($(this).parent().children('.content').hasClass('menu-open')) {
    ////            $(this).parent().children('.content').removeClass('menu-open');
    ////            $(this).parent().children('.content').addClass('menu-closed');return;
    ////        }
    ////    });


    ///////////////////
    /// il "focus-on-profilo" sarï¿½ sostituito: da owl a bs.carousel
    //    // SDPPUB-1173
    //    //testo se sono sul sito www o en (non applicato sui federati)
    //    if($('body').hasClass("www") || $('body').hasClass("wwwen")) {
    //    	//testo se c'ï¿½ il block del carousel, altimenti nelle altre pagine lo script va in errore e non esegue il resto del js
    //    	if($('#block-views-focus-on-profilo-block .owl-carousel').length) {	
    //	        $carousel = $('#block-views-focus-on-profilo-block .owl-carousel');
    //	        $carousel.owlCarousel();
    //	        //alert($carousel);
    //	        var owl = $carousel.data('owlCarousel');
    //	
    //	        $('.owl-button').click(function(){
    //	            var Classes = $(this).attr('class').split(" ");
    //	            var Slide = 0;
    //	            $.each(Classes, function(index, value) {
    //	                if (value.indexOf("owl-slide-") > -1) {
    //	                    Slide = value.split("-")[2];
    //	                }
    //	            });
    //	            $('#block-views-focus-on-profilo-block .attachment li').each(function() {
    //	                if ($(this).hasClass('active')) $(this).removeClass('active');
    //	            });
    //	            $(this).parent().addClass('active');
    //	            owl.jumpTo(Slide);
    //	        });
    //	
    //	        $('.owl-button').mouseover(function(){
    //	            var Classes = $(this).attr('class').split(" ");
    //	            var Slide = 0;
    //	            $.each(Classes, function(index, value) {
    //	                if (value.indexOf("owl-slide-") > -1) {
    //	                    Slide = value.split("-")[2];
    //	                }
    //	            });
    //	            $('#block-views-focus-on-profilo-block .attachment li').each(function() {
    //	                if ($(this).hasClass('active')) $(this).removeClass('active');
    //	            });
    //	            $(this).parent().addClass('active');
    //	            owl.jumpTo(Slide);
    //	        });
    //	    }
    //	    

    //****************************************************************************//
    ////////// nuovo carousel basato su boostrap carousel
    //testo se sono sul sito www o en (non applicato sui federati)
    if ($('body').hasClass("www") || $('body').hasClass("wwwen")) {
        if ($('#block-views-focus-on-profilo-block .carousel').length) {
            //ho un carousel di tipo "focus-on-profilo"
            var carouselblock = '#block-views-focus-on-profilo-block';
            var carousel = carouselblock + ' .carousel';

            //aggiungo la funzione mouseover sui miei "button" personalizzati
            $(carouselblock + ' .carousel-button').mouseover(function () {
                //se passo sul "button" personalizzato, individuo il numero della slide in base alla classe carousel-slide-N
                var Classes = $(this).attr('class').split(" ");
                var Slide = -1;
                $.each(Classes, function (index, value) {
                    if (value.indexOf("carousel-slide-") > -1) {
                        Slide = parseInt(value.split("-")[2]);	//deve essere di "tipo" numerico
                    }
                });
                if (Slide > -1) {	//vuol dire che ho settato questa classe nel "button" personalizzato, altrimenti non faccio nulla
                    //poichï¿½ se salto tramite "button" personalizzato non voglio l'effetto transition
                    //recupero il valore attuale "di sistema" TRANSITION_DURATION
                    var transition = jQuery.fn.carousel.Constructor.TRANSITION_DURATION;
                    //lo setto a zero, per non avere alcun delay
                    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 0;

                    //imposto la classe, definita nel mio css, per annullare gli effetti di transition e transform
                    $(carousel + ' .carousel-inner > .item').removeClass('right');
                    $(carousel + ' .carousel-inner > .item').removeClass('left');
                    $(carousel + ' .carousel-inner > .item').removeClass('prev');
                    $(carousel + ' .carousel-inner > .item').removeClass('next');
                    $(carousel + ' .carousel-inner > .item').addClass('notransition');

                    //cambio la classe active del mio button
                    $(carouselblock + ' .attachment li').each(function () {
                        if ($(this).hasClass('active')) $(this).removeClass('active');
                    });
                    $(this).parent().addClass('active');

                    //e in seguito salto alla slide selezionata
                    //salto alla slide selezionata; NOTA il parametro Slide DEVE essere di tipo numerico
                    $('.carousel').carousel(Slide);

                    //tolgo la classe introdotta e reimposto il valore del TRANSITION_DURATION
                    $(carousel + ' .carousel-inner > .item').removeClass('notransition');
                    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = transition;
                }
            });
        }
    }
    //****************************************************************************//


    // da verificare se serve
    $('#block-views-focus-on-profilo-block .views-field-title').click(function () {
        $(this).parent().parent().toggleClass('menu-open');
    });



    // serve per l'apri-chiudi da mobile nella colonna di destra (quanto meno nella pagina di sezione)
    $('.node-aggregatore-correlati .field-name-title').click(function () {
        $(this).parent().toggleClass('menu-open');
    });


    // dovrebbe servire nella pagina del motore di ricerca degli insegnamenti
    if (!$('.views-exposed-form .filtra').parents('.view-offerta-formativa-erogata-research').length) {
        $('.views-exposed-form .filtra').parent().addClass('menu-closed');
    }
    //questa dovrebbe servire in generale per tutte le form che hanno il titoletto con class="filtra"
    $(document).on('click', '.views-exposed-form .filtra', function () {
        $(this).parent().toggleClass('menu-closed');
    });



    //// ---- menu lingue e ricerca ------- da verificare
    //    // menu lingue + menu CSE - rimosse istruzioni per GSA
    //    var menu_lingue = '#block-menu-menu-lingue';
    //    var block_search_container = '#block-search-form .google-cse .container-inline';
    //    var block_search_title = '#block-search-form h2.block-title';
    //
    //    $(menu_lingue + ' ul').addClass('menu-closed');
    //
    //    $(menu_lingue + ' h2').click(function(){
    //        $(this).toggleClass('active');
    //        $(menu_lingue + ' ul').width($( window ).width());
    //        $(menu_lingue + ' ul').toggleClass('menu-closed');
    //
    //        if(!$(block_search_container).hasClass('menu-closed')) {
    //
    //            $(block_search_container).toggleClass('menu-closed');
    //            $(block_search_title).toggleClass('active');
    //        }
    //    });
    //
    //
    //    $(block_search_container).addClass('menu-closed');
    //
    //    $(block_search_title).click(function(){
    //        $(this).toggleClass('active');
    //        var leftpos = 119 - $( window ).width();
    //        var wid = $( window ).width();
    //        $(block_search_container).width(wid);
    //        $(block_search_container).css({left:leftpos});
    //        $(block_search_container).toggleClass('menu-closed');
    //
    //        if(!$(menu_lingue + ' ul').hasClass('menu-closed')) {
    //            $(menu_lingue + ' ul').toggleClass('menu-closed');
    //            $(menu_lingue + ' h2').toggleClass('active');
    //        }
    //    });
    //// ---- menu lingue e ricerca


    //****************************************************************************//
    // gestione dell'area di ricerca

    // gestione del toggle del search (su mobile)
    var search_btn = '.search-trigger';
    var search_block = '.block-search';

    //if ($(window).width() < 768) $(search_block).hide();
    //alert('ho nascosto');

    $(search_btn).click(function (e) {
        //alert('ho cliccato');
        $(search_block).toggleClass('cucu');
        e.preventDefault();
    });
    // testo default input cerca

    // gestione del messaggio che compare nell'area di testo
    var search_text = 'Search';
    var search_form = '#search-block-form input.form-text';
    if (~$('html').attr('lang').indexOf('it')) {
        search_text = 'Cerca informazioni o persone';
    }
    // if($('body').hasClass("wwwen")) { search_text = 'Search'; };
    $(search_form).value = search_text;

    $(search_form).focus(function () {
        if (this.value == search_text) { this.value = ''; }
    });

    $(search_form).blur(function () {
        if (this.value == '') { this.value = search_text; }
    });
    //****************************************************************************//



    //// da verificare se serve ancora
    // PTL-5046 accordion non accessibili / trasformo i div in button per renderli nativamente focussabili da tastiera e semanticamente corretti
    var paramsContainerChildren = $(".aprichiudi-collection .field-collection-item-field-paragrafo").find('.aprichiudi-titlerow');
    for (let i = 0; i < paramsContainerChildren.length; i++) {
        var buttonElement = document.createElement('button');

        buttonElement.className = paramsContainerChildren[i].classList;
        buttonElement.classList.add("btn--reset");
        buttonElement.innerHTML = paramsContainerChildren[i].innerHTML;
        paramsContainerChildren[i].replaceWith(buttonElement);
    }

    $(".aprichiudi-collection .field-collection-item-field-paragrafo").children("div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')").hide();
    $('.aprichiudi-collection .aprichiudi-titlerow').click(function () {
        $(this).parents('.aprichiudi-collection').toggleClass('menu-open');
        $(this).parents('.aprichiudi-collection .field-collection-item-field-paragrafo').children("div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')").slideToggle();
    });



    /////// --- testo alternativo per le ancore dei correlati --- dovrebbe servire ancora
    // SDPPUB-1615: aggiunge text alternative fisso all'elemento 'a' dei correlati in it/en - solo siti esterni e pagine di approfondimento
    var add_tooltip_to_link = function (jq_obj, text_alt) {
        $.each(jq_obj, function (index, value) {
            $(value).attr('alt', text_alt);
            $(value).attr('title', text_alt);
        });
    };

    var text_alt = "Il collegamento si apre in una nuova finestra";
    var siti_esterni = $('aside .correlati .views-field-field-link-siti-esterni ul li a');
    var approfondimenti = $('aside .correlati .views-field-field-risorsa ul li a');

    add_tooltip_to_link(siti_esterni, text_alt);
    add_tooltip_to_link(approfondimenti, text_alt);



    /////// --- views reset button workaround --- dovrebbe servire ancora
    // SDPPUB-2177: views reset button workaround : https://www.drupal.org/node/1109980#comment-8613897
    var btn_reset = '.views-reset-button .form-submit';
    var btn_submit = '.views-submit-button .form-submit';
    var reset_class = 'reset-pressed';
    var submit_class = 'submit-pressed';
    if (!$('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length) {
        $(document).delegate(btn_reset, 'click', function (event) {
            if ($(btn_reset).hasClass(reset_class)) {
                $(btn_reset).removeClass(reset_class);
                $(btn_submit).removeClass(submit_class);
            }
            else {
                $(btn_reset).addClass(reset_class);
                $(btn_submit).addClass(submit_class);
            }

            event.preventDefault();
            $('form').each(function () {
                $('form select option').removeAttr('selected');
                $('form input[type=text]').attr('value', '');
                this.reset();
            });
            $(btn_submit).click();
            return false;
        });
    }



    //////// #liveStreaming
    // verificare se riscrivere e spostare sotto player_resize.js

    // Calcola la dimensione del div contenitore del player (#liveStreaming) e imposta le dimensioni corrette in largheza e altezza
    var width = $("div#liveStreaming").width();
    var height = parseInt(width / 16 * 9);
    $('#flash_container').attr('width', width).attr('height', height + 24);// il + 24 serve per considerare la barra del player
    //            	alert('resize');

    // In base al resize della finestra si ridimensiona il player per visualizzarsi nella massima dimensione possibile
    $(window).resize(function () {
        var width = $("div#liveStreaming").width();
        var height = parseInt(width / 16 * 9);
        $('#flash_container').attr('width', width).attr('height', height + 24);// il + 24 serve per considerare la barra del player
        //            	alert('done');
    });


    //////// media gallery
    /// media gallery, effetto selezione e vista del popup anche sul focus
    $(".media-gallery-item-wrapper").focusin(function () {
        $(this).find(".meta-wrapper.hover").addClass("meta-wrapper-onfocus");
    });
    $(".media-gallery-item-wrapper").focusout(function () {
        $(this).find(".meta-wrapper.hover").removeClass("meta-wrapper-onfocus");
    });


    //////// tabelle responsive
    // per rendere le tabelle all'interno del contenuto della pagina "piï¿½" responsive
    $('#corpo-pagina table').wrap('<div class="table-responsive"></a>');


    // navigazione da tastiera - per trasformare in ancora navigabile da tastiera un aprichiudi che non lo ï¿½
    // $('.field-name-title .titolo_h3').wrapInner( '<a href="#" class="apri-chiudi-a"></a>'); 
    //$('.apri-chiudi-a').click(function(e){
    //	e.preventDefault();
    //});

});

;
/**
 * @file
 * varius scripts in Drupal format
 *
 */
(function ($,Drupal) {


  Drupal.behaviors.unito2 = {
    attach: function(context,settings) {
      try{
        // corsi_di_studio_accordion_init_closed();
        move_carousel_on_page();
        remove_eventi_attivi_class_from_hp();
        togle_ct_post_laurea_dottorato_full_page_classes();
      }catch(error){
        console.warn(error);
      }
    },
    dettach: function(context,settings) {},
  }
  togle_ct_post_laurea_dottorato_full_page_classes = function(){
    try{
      if($('.node-post-laurea-dottorato.view-mode-full').length){
        var page = $('.node-post-laurea-dottorato.view-mode-full');
        if(page.children('.field-name-pld-banner').length){
          if(page.children('.field-name-pld-banner').prev().length){
            page.children('.field-name-pld-banner').prev().wrap("<div  class='horrizontal-line-after'></div>");
          }
        }
        if(page.children('.field-collection-container').length){
          console.log('ciao');
          if(page.children('.field-collection-container').prev().length){
            page.children('.field-collection-container').prev().wrap("<div  class='horrizontal-line-after'></div>");
          }
        }
        if(page.children('.horrizontal-line-after').children('.field-collection-container').length){
          if(page.children('.horrizontal-line-after').children('.field-collection-container').parent('div').prev().length){
            page.children('.horrizontal-line-after').children('.field-collection-container')
                .parent('div').prev().wrap("<div  class='horrizontal-line-after'></div>");
          } 
        }
        if(page.children().length == 1){
          page.children().each(function(){
            if($(this).hasClass('horrizontal-line-after')){
              $(this).removeClass('horrizontal-line-after');
            }
          });
        }
        page.find('.horrizontal-line-after').each(function(){
          if($(this).children('.horrizontal-line-after').length){
            $(this).children('.horrizontal-line-after').unwrap();
          }
        });
        
        page.find('p').each(function() {
            var $this = $(this);
            if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.remove(); 
        }); 
      }
    }catch(error){console.log(error);}
  }
  corsi_di_studio_accordion_init_closed = function(){
    try{
      $('#block-quicktabs-elenco-corsi').find('#heading-quickset-elenco_corsi-0 a')
                                 .trigger('click');
    }catch(error){console.log(error);}
  }
  remove_eventi_attivi_class_from_hp = function(){
    try{
      var pathname = window.location.pathname;
      
      if(~pathname.indexOf('/') && pathname.length == 1){
         if($('.main-container.container').hasClass('eventi-attivi')){
          $('.main-container.container').removeClass('eventi-attivi');
         }
      }
    }catch(error){console.log(error);}
  }
  /**
   * Trick for placing carousel by field collection preferences,
   * instead of node preferences.
   *
   * - Removes all duplicate ids that multiple field collections have placed.
   * - moves carousel position.
   */
  move_carousel_on_page = function(){
    try{
     if($('#bootstrap-carousel-wrapper').length > 0){
       var carousel = $('#carousel-bootstrap').detach();
       carousel.appendTo( $('#bootstrap-carousel-wrapper'));
     } 
    }catch(error){
      console.log(error);
    }
  }


})(jQuery,Drupal);
;
(function ($,Drupal) {
  let waitForEl = function(selector, callback) {
    if ($(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        waitForEl(selector, callback);
      }, 100);
    }
  };
	Drupal.behaviors.search_corsi_autocomplete = {
	    attach: function(context,settings) {
         try{
          autocomplete_html_setup();
          autocomplete_submit_btn_alter();
  			  autocomplete_result_submit_behavior();  
          autocomplete_reset_behavior();
          overrideAutocompleteFoundMethod();
          clearInputOnPageLoad();

         }catch(error){console.log(error);}
	    },
	    dettach: function(context,settings) {},
    }
    autocomplete_html_setup = function(){
      try{
        if($('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length){
           $('.filtra').remove();
           var total = $('.field-collection-container').find('.field-items').first().children();
           var field = $('.field-collection-container').find('.field-items')
                                           .first()
                                           .children().last();
           var block = $('#block-views-3dc6531e9e7aad0210eeb9d4c46b4006');
           if(total.length > 1){
            block.insertBefore(field);
           }

        }
      }catch(error){console.log(error);}
    }
    autocomplete_submit_btn_alter = function(){
      var root = $('#views-exposed-form-ugov-corsi-di-studio-ricerca-block');
      var wrapper = root.find('.form-item-corso.form-type-textfield.form-autocomplete .input-group');
      wrapper.find('.input-group-addon span')
             .removeClass('glyphicon-refresh')
             .addClass('glyphicon-search');
      wrapper.find('.input-group-addon span').on('click',function(){
        root.find('.btn.btn-default.form-submit.btn-primary').trigger('click');

      });
      if(root.parent('.view-filters').next('.view-empty').length){
        var root2 = $('#block-quicktabs-elenco-corsi');
        root2.find('.view-empty').remove();
        root2.prepend(root.parent('.view-filters').next('.view-empty'));
      }
    }
    autocomplete_reset_behavior = function(){
      if($('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length){
        root = $('#views-exposed-form-ugov-corsi-di-studio-ricerca-block');
        reset_btn = root.find('.views-reset-button .form-submit');
        submit = root.find('.views-submit-button .form-submit');
        $(document).delegate('.views-reset-button .form-submit','click',function(event){
              event.preventDefault();
              $('form').each(function(){
                $('form input[type=text]').attr('value', '');
                this.reset();
              });
              let root = $('#block-quicktabs-elenco-corsi');
              root.find('.hide-unawanted-results').each(function(){
               $(this).removeClass('hide-unawanted-results');
              });
              $('.view.view-ugov-corsi-di-studio-ricerca .view-content').remove();
              return false;
        });
      }
    }
    // Attendo i risultati del filtro esposto, per filtrare quicktabs di seguito
    autocomplete_result_submit_behavior = function(){
    if($('[id^="edit-submit-ugov-corsi-di-studio-ricerca"]').length === 0){
    	return;
    }
    if($('#volatile-results').length){
       $('#volatile-results').remove();
    }
    $('[id^="edit-submit-ugov-corsi-di-studio-ricerca"]').on('click',function(){
       let root = $('#block-quicktabs-elenco-corsi');
       root.find('.hide-unawanted-results').each(function(){
        $(this).removeClass('hide-unawanted-results');
       });
       let selector = '.view.view-ugov-corsi-di-studio-ricerca .view-content';
       var that = $(this);
       waitForEl(selector, function() {
          let elements = $('.view.view-ugov-corsi-di-studio-ricerca .view-content .views-field a');
          let results = [];
          elements.each(function(){
            var origin   = window.location.origin;
            results.push(origin+$(this).attr('href'));
          });
          hide_elements_if_not_in_results(results,that);
          $('.view.view-ugov-corsi-di-studio-ricerca .view-content').remove();
       });
    });
  }
    hide_elements_if_not_in_results = function(results,that){   
    let root = $('#block-quicktabs-elenco-corsi');
    if(root.length === 0){
    	return;
    }
    root.find('.view-content .views-row .field-content a').each(function(){
      if($.inArray($(this).attr('href'), results) === -1){
        $(this).parentsUntil('ul').addClass('hide-unawanted-results'); 
      }
    });
    root.find('.view-content').children().each(function(){
      if($(this).find('li:not(.hide-unawanted-results)').length == 0){
        $(this).addClass('hide-unawanted-results');
      }
    });
    root.find('.view-grouping:not(.hide-unawanted-results)').each(function(){
      $(this).children('.view-grouping-content').each(function(){
        $(this).children('.item-list').each(function(){
          if($(this).find('li:not(.hide-unawanted-results)').length == 0){
            $(this).addClass('hide-unawanted-results');
          }
        });
      });
    });
    root.find('#panel-group-quickset-elenco_corsi').children().each(function(){
      if($(this).find('.view-content').children('div:not(.hide-unawanted-results)').length == 0){
        $(this).addClass('hide-unawanted-results');
      }
    });
    applyCounter(root,results,that);
  }
    applyCounter = function(root,results,that){
    let stringa = that.closest('div')
                      .prev('.views-widget-filter-nome_esteso')
                      .find('input').val();
    let totalFound = 0;
    let dupplicates = [];
    root.find('.view-empty').remove();
    root.find('.view-content .views-row .field-content a').each(function(){
      if($.inArray($(this).attr('href'), results) !== -1){
        if($.inArray($(this).attr('href'), dupplicates) === -1){
          totalFound++;
          dupplicates.push($(this).attr('href'));
        }
      }
    });
    
    var found = 'Trovato';
    if(totalFound > 1){
      found = 'Trovati';
    }
    testo = found+' '+totalFound+' risultati per "'+stringa+'"';
    results = '<div id="volatile-results"><span>'+testo+'</span></div>';
    root.prepend(results);
  }
    // console.log($.type(Drupal.jsAC));
  
    function overrideAutocompleteFoundMethod() {
      if (typeof Drupal.jsAC != 'undefined') {
        var originalFound = Drupal.jsAC.prototype.found;

        Drupal.jsAC.prototype.found = function (matches) {
          originalFound.call(this, matches);

          let inputElement = this.input;  // Save reference to the input element
          let block = "#views-exposed-form-ugov-corsi-di-studio-ricerca-block";
          if($(block).length){
            $(this.popup).find('li').each(function() {
              let $this = $(this);
              let text = $this.text();

              $(block).find('.dropdown ul.dropdown-menu li a div.reference-autocomplete a').each(function(){
                if($(this).text().trim() === text.trim()){
                  var origin = window.location.origin;
                  var href = $(this).attr('href');

                  $this.off('mousedown').on('mousedown', function (e) {
                    e.preventDefault();
                    let a = document.createElement('a');
                    a.target = '_self';
                    a.href = origin + href;

                    // Clear the input value
                    // $(inputElement).val("");

                    a.click();
                  });
                }
              });
            });
          }
        };
      }
    }
    function clearInputOnPageLoad() {
      let block = "#views-exposed-form-ugov-corsi-di-studio-ricerca-block";
      if($(block).length){
        let input = $(block).find('input#edit-corso');
        window.addEventListener("pageshow", function() {
          let val = input.val();
          if (/\<.*?\>/g.test(val)) { // se Ã¨ HTML
            input.val(''); // svuota l'input
          }
        });
      }
    }

})(jQuery,Drupal);
;

(function ($, Drupal) {

  /**
   * Sul evento apri di un apri-chiudi in pagina,
   * chiude tutti gli altri tab aperti.
   */

  Drupal.behaviors.apriChiudiAccordion = {
    attach: function (context, settings) {

      aprichiudi({
        case: 11,
        container: ".aprichiudi-view.aprichiudi-all",
        header_class: ".view-grouping-header",
        content_class: ".view-grouping-content",
      }, context);
      aprichiudi({
        case: 11,
        container: ".view-offerta-laurea-corso-1.aprichiudi-view.aprichiudi-all",
        header_class: "h3",
        content_class: "ul",
      }, context);
      /*
      aprichiudi({
          case:11,
          container:".view-offerta-af-1.aprichiudi-view",
          header_class: "h3",
          content_class:"ul",
      },context);*/
      aprichiudi({
        case: 11,
        container: ".view-offerta-af-2.aprichiudi-view",
        header_class: "h3",
        content_class: "ul",
      }, context);
      aprichiudi({
        case: 2,
        container: ".aprichiudi-row.aprichiudi-all",
        header_class: ".aprichiudi-titlerow",
        content_class: "div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')",
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudi-opzione-parent.field-collection-item-field-paragrafo",
        header_class: ".aprichiudi-titlerow",
        content_class: "div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')",
        root: '.field-collection-container',
      }, context);
      aprichiudi({
        case: 3,
        container: ".group-master.aprichiudi-opzione-parent",
        header_class: ".aprichiudi-titlerow",
        content_class: "*:not('.aprichiudi-titlerow')",
        root: '.view-content',
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudisottopar-opzione-parent.field-collection-item-field-sottoparagrafo-apri-chiudi",
        header_class: ".aprichiudisottopar-titlerow",
        content_class: "div:not('.aprichiudisottopar-titlerow'), span:not('.aprichiudisottopar-titlerow')",
        root: '.field-items',
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudi-wrapper",
        header_class: ".aprichiudi-wrapper h3",
        content_class: "*:not('.aprichiudi-wrapper h3')",
        root: '.view-ugov-view-degreecourse',
      }, context);
      aprichiudi({
        case: 4,
        container: "#block-menu-menu-accesso-rapido .block-inner",
        header_class: "h2",
      }, context);
      aprichiudi({
        case: 4,
        container: "#block-menu-menu-menu-profili .block-inner",
        header_class: "h2",
      }, context);
      aprichiudi({
        case: 4,
        container: ".box-aprichiudi",
        header_class: "span.aprichiudi-titolo",
      }, context);
      aprichiudi({
        case: 5,
        container: ".group-servizio.field-group-div",
        header_class: ".field-group-format-toggler",
        content_class: ".field-group-format-wrapper",
        remove_event: "a.field-group-format-title",
        root: '.views-row',
      }, context);
    },
    dettach: function (context, settings) { },
  }


  aprichiudi = function (params, context) {
    switch (params.case) {
      case 1:
        // unito.js 175,227 -- ï¿½ diventato case 11 perchï¿½ ho parametrizzato il children
        $(params.container).find(params.content_class).hide();

        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent().toggleClass('menu-open');
            $(this).parent().children(".view-grouping-content").slideToggle();
            // accordion style
            $(this).parent().siblings().removeClass('menu-open');
            $(this).parent().siblings().children(".view-grouping-content").slideUp();
          });
        break;
      case 11:
        // nuovo caso

        // PTL-5046 accordion non accessibili / trasformo i div in button per renderli nativamente focussabili da tastiera e semanticamente corretti
        changeInButton(params);

        $(params.container).find(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent().toggleClass('menu-open');
            $(this).parent().children(params.content_class).slideToggle();
            // accordion style
            $(this).parent().siblings().removeClass('menu-open');
            $(this).parent().siblings().children(params.content_class).slideUp();
          });
        break;
      case 2:
        // unito.js 184,238
        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent(params.container).toggleClass('menu-open');
            $(this).siblings().slideToggle();
            // accordion style
            if ($(this).parents('.item-list').length) {
              $(this).parents('.item-list').siblings().find(params.container).removeClass('menu-open');
              $(this).parents('.item-list').siblings().find(params.container).children(params.content_class).slideUp();
            }
            $(this).parent(params.container).siblings().removeClass('menu-open');
            $(this).parent(params.container).siblings().children(params.content_class).slideUp();
          });
        break;
      case 3:
        //paragrafo.js 12,33, 23, 44, 17, 39

        // PTL-5046 accordion non accessibili / trasformo i div in button per renderli nativamente focussabili da tastiera e semanticamente corretti
        changeInButton(params);

        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).addClass('aprichiudi-current');
            $(this).parents(params.container).toggleClass('menu-open');
            $(this).parents(params.container).children(params.content_class).slideToggle();
            // accordion style
            var siblings = $(this).parents(params.root).find(params.header_class);
            siblings.each(function () {
              if ($(this).hasClass('aprichiudi-current')) {
                $(this).removeClass('aprichiudi-current');
                return true;
              }
              $(this).parents(params.container).removeClass('menu-open');
              $(this).parents(params.container).children(params.content_class).slideUp();
            });

          });

        break;
      case 4:
        //unito.js 81
        if (!params.container.length) {
          return true;
        }
        if (!($(params.container).hasClass('menu-closed') || $(params.container).hasClass('menu-open'))) {
          $(params.container).addClass('menu-closed');
        }
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + ' ' + params.header_class, function () {
            $(this).parent().addClass('toggled');
            if ($(this).parent().hasClass('menu-closed')) {
              $(this).parent().removeClass('menu-closed').addClass('menu-open');
            } else {
              $(this).parent().removeClass('menu-open').addClass('menu-closed');
            }
          });
        break;
      case 5:
        // servizi/servizi-line/tutti-i-servizi-line
        changeInButton(params);

        $(params.remove_event).off('click');
        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function (e) {

            $(this).addClass('aprichiudi-current');
            // accordion style
            $(this).closest(params.root).siblings().each(function () {
              $(this).find(params.header_class).each(function (ola) {
                $(this).removeClass('aprichiudi-current');
                $(this).parents(params.container).parent().parent().removeClass('collapsed');
                $(this).parents(params.container).children(params.content_class).length;
                $(this).parents(params.container).children(params.content_class).slideUp();
              });
            });
            $(this).parents(params.container).parent().parent().toggleClass('collapsed');
            $(this).parents(params.container).children(params.content_class).slideToggle();
            e.preventDefault();
          });
        break;
      default:
        break;

    }
  }

  changeInButton = function (params) {

    var paramsContainerChildren = $(params.container).find(params.header_class);

    for (let i = 0; i < paramsContainerChildren.length; i++) {
      var buttonElement = document.createElement('button');

      buttonElement.className = paramsContainerChildren[i].classList;
      buttonElement.classList.add("btn--reset");
      buttonElement.innerHTML = paramsContainerChildren[i].textContent || paramsContainerChildren[0].innerText;

      if (params.header_class === 'h3') {
        paramsContainerChildren[i].innerHTML = '';
        paramsContainerChildren[i].append(buttonElement);
      } else {
        paramsContainerChildren[i].replaceWith(buttonElement);
      }
    }
  }


})(jQuery, Drupal);
;

(function ($,Drupal) {

  // Fix on page reload perde la funzionalitÃ  l'ancora
  $(window).bind('load', function() {
    onAnchorDestinationOpenApriChiudi();
  });

  Drupal.behaviors.unitowww = {
    attach: function(context,settings) {
      // onAnchorDestinationOpenApriChiudi_old();
    },
    dettach: function(context,settings) {},
  }
  /**
   * SDPPUB-4462: inserimento di ancora per paragrafi
   *
   * Con il cambio del tema, e l'aggiornamento del jquery,
   * che hanno rotto il funzionamento della prima function.
   *
   *
   * NOTA: l'ordine di chiamata in .info Ã¨ importante. Prima
   *       questo file di quello dell'Accordion
   *
   *
   * @author     Apostolos Tsalikis <a.tsalikis@cineca.it>
   * @since      2019/07/19
   */
  onAnchorDestinationOpenApriChiudi = function(){
    try{
      var root = $('.field-collection-view');
      var hash = location.hash.replace('#','');
      if(hash.indexOf('gsc.') === -1){
        var hashID = "#"+hash;
        var wrapper = ".aprichiudi-opzione-parent,.aprichiudisottopar-opzione-parent";
        var trigger = ".aprichiudi-titlerow,.aprichiudisottopar-titlerow";
        if($(hashID).length){
          if($(hashID).parents(wrapper).length){
            var parents = $(hashID).parents(wrapper);
            parents.each(function(){
              $(this).find(trigger).trigger('click.ac');
            });
            setTimeout(function() {
              var row = $(hashID).closest('.field-item');
              // scroll(row, false);
              scrollIntoView(row, true);
            }, 500); // Delay per assicurarsi che gli accordion siano aperti
            return;
          }else if($(hashID).parents('.field-collection-view').length){
            setTimeout(function() {
              var row = $(hashID).closest('.field-item');
              // scroll(row, false);
              scrollIntoView(row, true);
            }, 1000);
            return;
          }
        }
      }
    }catch(error){
      console.log(error);
    }
  }


  function scrollIntoView(elem, noApriChiudi) {
    var offset = noApriChiudi ? calculateOffset() : 105;
    elem[0].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    window.scrollBy(0, -offset);
  }

  function calculateOffset() {
    var navbarHeight = $('#nav-main').outerHeight(true);
    if ($('#toolbar').length) {
      navbarHeight += $('#toolbar').outerHeight(true);
    }
    return navbarHeight + 110;
  }



  scroll = function(elem,noApriChiudi){
    if(noApriChiudi){
      var navbar = $('#nav-main').outerHeight(true);
      var sottrai = navbar;
      if($('#toolbar').length){
        sottrai += $('#toolbar').outerHeight(true);
      }
      $("html, body").animate({
          scrollTop: elem.offset().top - sottrai - 100
      }, 2000);
    }else{
      $("html, body").animate({
          scrollTop: elem.offset().top - 105
      }, 2000);
    }
  }
  /**
   * CR 18-21 WWW + EN: inserimento di ancora per paragrafi
   * Molte volte il paragrafo finisce dentro ad un aprichiudi,
   * e l'ancora non funziona se l'elemento Ã¨ hidden.
   * Per ovviare in questi casi, questo script fa si che l'aprichiudi
   * venga aperto prima di posizionare la pagina alla ancora.
   *
   * @author     Apostolos Tsalikis <a.tsalikis@cineca.it>
   * @since      2018/07/11
   */
  onAnchorDestinationOpenApriChiudi_old = function(){
    var hash = location.hash.replace('#','');
    var hashID = "#"+hash;
    if(hash != ''){
      if($(".aprichiudi-opzione-parent")[0]){
        var ac_field = $(hashID).closest(".aprichiudi-opzione-parent").find('.field-name-field-titolo-paragrafo');
        if(ac_field.is('.aprichiudi-titlerow')){
          ac_field.trigger('click');
          $('html, body').scrollTop( $(hashID).offset().top - 100);
          return;
        }
      }
      $('html, body').scrollTop( $(hashID).offset().top - 200);
    }
  }

})(jQuery,Drupal);
;
jQuery(document).ready(function($) {
   	//alert('resize');
    
    // Calcola la dimensione del div contenitore del player (div.file-video) e imposta le dimensioni corrette in largheza e altezza
	//alert('ready');
	$( "div.file-video" ).each(function(index,fv) {
		var width=320;
		if ( $(fv).parents(".carousel-inner").length ) {	//è un video dentro un carousel
			var width=$(fv).parents(".carousel-inner").width();	//è un video dentro un carousel, la dimensione si adegua al carousel
		} else {
			//non sono dentro un carousel, devo fissare la dimensione del video (es. nel paragrafo)
			var width = $(fv).width() ////Math.min($(fv).width(), 320);
			if (width < 320) width=320;	//fisso una larghezza minima, anche quando width() restituisce 0
		}
		//alert(width);
		//imposto la larghezza dell'elemento iframe
		$(fv).find("iframe").attr('width',width);
		//alert($(fv).find("iframe").width());
		//Imposto l'altezza dell'iframe in base alla sua attuale larghezza, con un rapporto 16/9
		var height = parseInt($(fv).find("iframe").width()/16*9) + 4;
		//alert(height);
		$(fv).find("iframe").attr('height',height);
	});		 
	//$( ".carousel-inner div.file-video" ).each(function(index,fv) {
	//	$(fv).find("iframe").attr('width','100%').attr('height','100%');
	//});		 

//		var width1 = $("div.file-video").width();
//		if (width1 == 0) width1=320;	//fisso una larghezza minima
//		alert (width1);
//		var width = Math.min(width1, 512);
//		var height = parseInt(width/16*9);
//		$("iframe").attr('width',width).attr('height',height+4);// il + 24 serve per considerare la barra del player
//		//alert('resize');

      // In base al resize della finestra si ridimensiona il player per visualizzarsi nella massima dimensione possibile
  $(window).resize(function(){
//	$( "div.file-video" ).each(function(index,fv) {
//		var width1 = $(fv).width();
//		if (width1 == 0) width1=320;	//fisso una larghezza minima
//		var width = Math.min(parseInt(width1), 512);
//		var height = parseInt(width/16*9) + 4;
//		$(fv).find("iframe").attr('width',width).attr('height',height);
//	});		 
//	$( ".carousel-inner div.file-video" ).each(function(index,fv) {
//		$(fv).find("iframe").attr('width','100%').attr('height','100%');
//	});		 
	$( "div.file-video" ).each(function(index,fv) {
		var width=320;
		if ( $(fv).parents(".carousel-inner").length ) {	//è un video dentro un carousel
			var width=$(fv).parents(".carousel-inner").width();	//è un video dentro un carousel, la dimensione si adegua al carousel
		} else {
			//non sono dentro un carousel, devo fissare la dimensione del video (es. nel paragrafo)
			var width = $(fv).width() ////Math.min($(fv).width(), 320);
			if (width < 320) width=320;	//fisso una larghezza minima, anche quando width() restituisce 0
		}
		//alert(width);
		//imposto la larghezza dell'elemento iframe
		$(fv).find("iframe").attr('width',width);
		//alert($(fv).find("iframe").width());
		//Imposto l'altezza dell'iframe in base alla sua attuale larghezza, con un rapporto 16/9
		var height = parseInt($(fv).find("iframe").width()/16*9) + 4;
		//alert(height);
		$(fv).find("iframe").attr('height',height);
	});		 

  });


});


;
jQuery(document).ready(function($) {
// nuova parte: gestisce i tasti play/pause nel carousel
	$('.playButton').click(function (e) {
		e.preventDefault();
		$(this).addClass("on").removeClass("off");
		$(this).siblings().addClass("off").removeClass("on");
    	$(this).parents('.carousel').carousel('cycle');
	});
	$('.pauseButton').click(function (e) {
		e.preventDefault();
		$(this).addClass("on").removeClass("off");
		$(this).siblings().addClass("off").removeClass("on");
    	$(this).parents('.carousel').carousel('pause');
	});

});
;

(function ($,Drupal) {


  Drupal.behaviors.calendar_extend = {
    attach: function(context,settings) {
        add_block_title();
        move_more_link();
        fix_calendar_page_classes();
        
    },
    dettach: function(context,settings) {},
  }

  fix_calendar_page_classes = function(){
    try{
      var pathname = window.location.pathname;
        if(~pathname.indexOf('calendar')){
            if($('#block-calendario-calendar').length){
              $('#block-calendario-calendar').removeClass('col-sm-12')
                                             .removeClass('col-md-5')
                                             .removeClass('col-lg-4')
                                             .removeClass('col-xl-3');
             if(!$('.main-container.container').hasClass('eventi-attivi')){
              $('.main-container.container').addClass('eventi-attivi');
             }
            }
        }
    }catch(error){console.log(error);}
  }
  add_block_title = function (){
    var titolo = '<div id="dyn-title" class="region-title"><span class="block-title">Scopri gli eventi in programma</span></div>';
    try{
        var pathname = window.location.pathname;
        if(~pathname.indexOf('eventi')){
            if($('#block-calendario-calendar').length){
                if(!$('#dyn-title').length){
                  $('#block-calendario-calendar').prepend(titolo);
                }
            }
        }
    }catch(error){}
  }
  move_more_link = function(){
    try{
        var pathname = window.location.pathname;
        if(~pathname.indexOf('eventi') || ~pathname.indexOf('calendar')){
            if($('.more-link').length){
                $("div.more-link").closest("div.d-flex").addClass("archivio");
                if(!$('#spalla-dx').length){
                  return;
                }
                if(!$('#spalla-dx > .d-flex.archivio').length){
                  $("#spalla-dx").append($('.d-flex.archivio'));
                }
                if($('.region.region-content').find('.d-flex.archivio').length){
                  $('.region.region-content').find('.d-flex.archivio').remove();
                }
            }
        }
    }catch(error){}
  }

})(jQuery,Drupal);
;

(function ($,Drupal) {


  Drupal.behaviors.handle_event_arguments = {
    attach: function(context,settings) {
      eventi_archiviati_handle_argument_argomento(context);
      avvisi_archiviati_handle_argument_argomento(context);
      avvisi_more_link_remove_arguments(context);
      eventi_more_link_remove_arguments(context);
    },
    dettach: function(context,settings) {},
  }
  eventi_more_link_remove_arguments = function(context){
    try{
      var pathname = window.location.pathname;
      if($('.view-eventi-all.view-display-id-block_10').length){
        if(pathname.indexOf('eventi-profilo')){
          var link = $('#spalla-dx')
                       .children('.d-flex')
                       .find('.more-link');
          var href = link.find('a').attr('href');
          href = href.split('?')[0];
          link.find('a').attr('href',href);

        }
      }
    }catch(error){console.log(error);}
  }
  avvisi_more_link_remove_arguments = function(context){
    try{
      var pathname = window.location.pathname;
      if($('.view-avvisi-all.view-display-id-block_9').length){
        if(pathname.indexOf('avvisi-profilo')){
          var link = $('.view-avvisi-all.view-display-id-block_9')
                       .children('.d-flex')
                       .find('.more-link');
          var href = link.find('a').attr('href');
          href = href.split('?')[0];
          link.find('a').attr('href',href);

        }
      }
    }catch(error){console.log(error);}
  }
  avvisi_archiviati_handle_argument_argomento = function(context){
    try{
      var argomento = getUrlParameter('field_tr_arg_notizia_tid');
      if($.isEmptyObject(argomento)){
        return false;
      }
      if(~argomento.indexOf('All') || $('body').hasClass('form-argument-processed')){
        return false;
      }
      var pathname = window.location.pathname;
      // console.log(pathname);
      if(~pathname.indexOf('/archivio-avvisi')){
        if(! $('body').hasClass('news-ajax-triggered')){
          $('#edit-field-tr-arg-notizia-tid option[value="'+argomento+'"]').attr('selected', 'selected');
          if (context !== document) {
            $(document).find('.chosen-container').prev().trigger('chosen:updated');
          }
          $('body').addClass('news-ajax-triggered');
          $('#edit-submit-avvisi-all')[0].click();
        }
      }
    }catch(error){
      console.warn(error);
    }
  }

  eventi_archiviati_handle_argument_argomento = function(context){
    try{
      var argomento = getUrlParameter('argomento');
      if($.isEmptyObject(argomento)){
        return false;
      }
      if(~argomento.indexOf('All') || $('body').hasClass('form-argument-processed')){
        return false;
      }
      var pathname = window.location.pathname;

      if(~pathname.indexOf('/archivio-eventi')){

        if(! $('body').hasClass('events-ajax-triggered')){
          $('[id^="edit-argomento"] option[value="'+argomento+'"]').attr('selected', 'selected');
          if (context !== document) {
            $(document).find('[id^="edit-argomento"] .chosen-container').prev().trigger('chosen:updated');
          }
          $('body').addClass('events-ajax-triggered');
          $('#edit-submit-eventi-all')[0].click();
        }
      }

    }catch(error){
      console.warn(error);
    }
  }
  eventi_archiviati_handle_argument_argomento2 = function(context){
    try{
      var argomento = getUrlParameter('field_tr_arg_evento_tid');
      if($.isEmptyObject(argomento)){
        return false;
      }
      if(~argomento.indexOf('All') || $('body').hasClass('form-argument-processed')){
        return false;
      }
      var pathname = window.location.pathname;

      if(~pathname.indexOf('/archivio-eventi')){

        if(! $('body').hasClass('events-ajax-triggered')){
          $('#edit-field-tr-arg-evento-tid option[value="'+argomento+'"]').attr('selected', 'selected');
          if (context !== document) {
            $(document).find('.chosen-container').prev().trigger('chosen:updated');
          }
          $('body').addClass('events-ajax-triggered');
          $('#edit-submit-eventi-all')[0].click();
        }
      }

    }catch(error){
      console.warn(error);
    }
  }
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

})(jQuery,Drupal);
;
(function ($,Drupal) {
	Drupal.behaviors.degree_programs_order = {
	    attach: function(context,settings) {
			   // alter_views_results_order_by_type(context,settings);
			   alter_views_results_grouping_order();
	    },
	    dettach: function(context,settings) {},
    }
    alter_views_results_grouping_order = function(){
    	try{
    		let exists = $('.view.view-ugov-view-degree.view-display-id-block_5.elencocorsi').length;
    		if(exists){
    			let vista = $('.view.view-ugov-view-degree.view-display-id-block_5.elencocorsi');

					var alphabeticallyOrderedDivs = $('.view-grouping').sort(function(a, b) {
					  var $aTitle = $(a).find('.view-grouping-header'), $bTitle = $(b).find('.view-grouping-header');
					  return String.prototype.localeCompare.call($aTitle.text().toLowerCase(), $bTitle.text().toLowerCase());
					});

					var container = vista.children('.view-content');
					container.empty().append(alphabeticallyOrderedDivs);
    		}
    		let _exists = $('.view.view-ugov-view-degree.view-display-id-block_4.elencocorsi').length;
    		if(_exists){
    			let vista = $('.view.view-ugov-view-degree.view-display-id-block_4.elencocorsi');

    			vista.find('.item-list').each(function(){
						var orderedDivs = $(this).find('ul > li').sort(function(a, b) {
						  var $aTitle = $(a).find('div:first-child > span > a');
						  var $bTitle = $(b).find('div:first-child > span > a');
						  return String.prototype.localeCompare.call($aTitle.text().toLowerCase(), $bTitle.text().toLowerCase());
						});
						// console.log(orderedDivs);
						var container = $(this).children('ul');
						container.empty().append(orderedDivs);
    			});
    		}
    	}catch(error){console.log(error);}
    }

    alter_views_results_order_by_type = function(context,settings){
      try{
	    let exists = $('#block-quicktabs-elenco-corsi').length;
	    if(exists){
	      let vista = $('.view-ugov-view-degree.view-display-id-block_7');
	      vista.find('.item-list').each(function(){
	        if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      let magistrale = vista.find('.item-list.laurea-magistrale')
	      let ciclo = vista.find('.item-list.laurea-magistrale-a-ciclo-unico');
	      magistrale.insertAfter(ciclo);
	      
	      vista = $('.view-ugov-view-degree.view-display-id-block_5');
	      let tipo = vista.find('.view-grouping-content > .item-list');
	      tipo.each(function(){
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      vista.find('.view-grouping-content').each(function(){
	      	magistrale = $(this).find('.item-list.laurea-magistrale');
	      	ciclo = $(this).find('.item-list.laurea-magistrale-a-ciclo-unico');
	      	magistrale.insertAfter(ciclo);
	      });
	      vista = $('.view-ugov-view-degree.view-display-id-block_13');
	      vista.find('.item-list').each(function(){
	        if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      magistrale = vista.find('.item-list.laurea-magistrale')
	      ciclo = vista.find('.item-list.laurea-magistrale-a-ciclo-unico');
	      magistrale.insertAfter(ciclo);
	      
	    }
      }catch(error){
        console.log(error);
      }
    }

})(jQuery,Drupal);;
(function ($,Drupal) {


  Drupal.behaviors.unito_iniziative = {
    attach: function(context,settings) {
      try{
        iniziative();
      }catch(error){
        console.warn(error);
      }
    },
    dettach: function(context,settings) {},
  }

  /*
  per nascondere il campo Iniziative quando Ã¨ valorizzato PNRR nella field
  collection "Elenco iniziative orientamento"
  */
  iniziative = function() {
      if ( ! $(".view-cards-iniziative.view-id-cards_iniziative.view-display-id-block").length){
        return false;
      }
      $(".field-collection-item-field-elenco-cards-orientamento").each(function(){
        if($(this).find('.group-card-text-elenco').children('.field-name-field-progetti-pnrr').length){
          let campo = '.field-name-field-tipologia-iniziativa.field-type-taxonomy-term-reference';
          $(this).find('.group-card-text-elenco').children(campo).addClass('hidden');
        }
      });
  }



})(jQuery,Drupal);
;
