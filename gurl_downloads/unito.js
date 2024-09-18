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

    //////questa versione non funziona perch� height restituisce 0
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




    /////////nella nuova grafica la "data in ogni pagina" non � pi� prevista (per il momento per il www)
    /////    var dayofweek = ['Luned&igrave;','Marted&igrave;', 'Mercoled&igrave;', 'Gioved&igrave;', 'Venerd&igrave;', 'Sabato', 'Domenica'];
    /////    var today = new Date();
    /////    $curdate = today.toLocaleDateString();
    /////    $letterday = dayofweek[today.getDay()-1];
    /////    if($('body').hasClass("wwwen")) { $letterday = '';$curdate = today.toDateString();}
    /////    $('body').prepend('<div id="datebar">'+$letterday+' '+$curdate+'</div>');


    ///////// nella nuova grafica la "region-menu non sembra esistere pi�
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
    /// il "focus-on-profilo" sar� sostituito: da owl a bs.carousel
    //    // SDPPUB-1173
    //    //testo se sono sul sito www o en (non applicato sui federati)
    //    if($('body').hasClass("www") || $('body').hasClass("wwwen")) {
    //    	//testo se c'� il block del carousel, altimenti nelle altre pagine lo script va in errore e non esegue il resto del js
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
                    //poich� se salto tramite "button" personalizzato non voglio l'effetto transition
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
    // per rendere le tabelle all'interno del contenuto della pagina "pi�" responsive
    $('#corpo-pagina table').wrap('<div class="table-responsive"></a>');


    // navigazione da tastiera - per trasformare in ancora navigabile da tastiera un aprichiudi che non lo �
    // $('.field-name-title .titolo_h3').wrapInner( '<a href="#" class="apri-chiudi-a"></a>'); 
    //$('.apri-chiudi-a').click(function(e){
    //	e.preventDefault();
    //});

});

