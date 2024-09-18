//****************************************************************************************//
//*     script di visualizzazione news su www.unito.it da www.unitonews.it
//*     autore: Alessandro Crivellin
//*     sviluppato da: sezione Prototipazione e management dei servizi ICT - Direzione Sistemi Informativi, Portale, E-learning - Universit▒ degli Studi di Torino
//*     data: 10/09/2019 v2
//* data: 24/09/2019 v2.c (Christian Dodaro)
//****************************************************************************************//
jQuery(document).ready(function( $ ) {
        var unito_news_widget_version='v2.c';
        var UNITO_NEWS_WIDGET_2019=UNITO_NEWS_WIDGET_2019||{},
                        id_aggancioUN=$('#block-block-9'),
                        TXT_PUBBLICATO='Pubblicato il ',
                        TXT_ALL='tutte le notizie ',
                        A_TITLE='vedi altre notizie',
                        BTN_GROUP = '<div class="text-center"><ul class="pagination dot-pagination"><li id="btngr1" class="active"><span>1</span></li><li id="btngr2"><a title="'+A_TITLE+'" href="#" >2</a></li><li id="btngr3"><a title="'+A_TITLE+'" href="#" >3</a></li></ul></div>';
                        SPAN_1='<span>1</span>',SPAN_2='<span>2</span>',SPAN_3='<span>3</span>',
                        TAG_A1='<a title="'+A_TITLE+'" href="#" >1</a>',
                        TAG_A2='<a title="'+A_TITLE+'" href="#" >2</a>',
                        TAG_A3='<a title="'+A_TITLE+'" href="#" >3</a>',
                        URL_ALL_1='http://www.unitonews.it',
                        NUM_ITEMS=9,
                        url_ws='https://www.unitonews.it/index.php/unito_export/'+NUM_ITEMS+'?cb=?',
                        contenitore='<div id="containerUN" class="vista-hp" role="region" aria-live="polite"></div>';
        id_aggancioUN.append(contenitore);
        var id_contenitoreUN=$('#containerUN');
        UNITO_NEWS_WIDGET_2019.formattaData=function formatData(ladata,con_ora){
                var data_ora=ladata.split(' '),ora=data_ora[1],solodata=data_ora[0];
                solodata=solodata.split('-');
                if(con_ora==true){return (solodata[2]+'/'+solodata[1]+'/'+solodata[0]+' '+ora);}
                else{return (solodata[2]+'/'+solodata[1]+'/'+solodata[0]);}
        };
        UNITO_NEWS_WIDGET_2019.Render=function (data,id_contenitore){
                var items='',chrSI=/"/g,chrNO="'",header='<div id="headerUN"></div>',id_header=$('#headerUN'),
                        footerUN=''+BTN_GROUP+'<div class="d-flex align-items-center justify-content-end mt-2"><div class="more-link"><a href="'+URL_ALL_1+'">'+TXT_ALL+'</a></div><div class="material-icons testonav">keyboard_arrow_right</div></div>',cont=0;
                $.each(data,function(key,val){
                        var altOK=val.title;
                        altOK.replace(chrSI,chrNO);
                        if(key%3==0){//raggruppo per 3 card
                                items='<div  role="region" class="view-content card-deck grp'+(++cont)+'" aria-live="polite">';
                         }
                        items+='<div class="card"><div class="hp-immagine card-img-top"><a href="'+val.completeUrl+'"><img typeof="foaf:Image" class="img-responsive" src="'+val.coverImageUrl+'" alt="'+altOK+' " width="512" height="295"/></a></div>';
                        items+='<div class="card-body">';
                        items+='<p class="card-text"><a href="'+val.completeUrl+'">'+val.title+'</a></p>';
                        items+='<p class="card-text"><span class="card-date">'+TXT_PUBBLICATO+'<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="'+val.created+'">'+UNITO_NEWS_WIDGET_2019.formattaData(val.created,false)+'</span></span></p>';
                        items+='</div></div>';
                        if(key%3==2){//chiudo raggruppamento card
                                items+='</div>';
                                id_contenitoreUN.append(items)
                        }
                });
                $('.grp2').addClass('sr-only');
                $('.grp3').addClass('sr-only');
                id_contenitoreUN.append(footerUN);
        };
        UNITO_NEWS_WIDGET_2019.initView= function(){
                id_contenitoreUN.hide();
                $.ajax({
                        type:"POST",
                        url:url_ws,
                        timeout:5000,
                        scriptCharset:'utf-8',
                        crossDoman:true,
                        dataType:'jsonp',
                        success:function(data){
                                id_contenitoreUN.show();
                                UNITO_NEWS_WIDGET_2019.Render(data,id_contenitoreUN);
                        },
                        error:function(){id_aggancioUN.html('');}
                });
        };
        UNITO_NEWS_WIDGET_2019.initView();

        $(document).on('click keypress','#btngr1',function(e){
                $('#btngr1').html(SPAN_1);
                $('#btngr2').html(TAG_A2);
                $('#btngr3').html(TAG_A3);
                $('#btngr1').addClass('active');
                $('#btngr2').removeClass('active');
                $('#btngr3').removeClass('active');
                $('.grp1').removeClass('sr-only').addClass('active');
                $('.grp2').addClass('sr-only').removeClass('active');
                $('.grp3').addClass('sr-only').removeClass('active');
        e.preventDefault();
        });
        $(document).on('click keypress','#btngr2',function(e){
                $('#btngr1').html(TAG_A1);
                $('#btngr2').html(SPAN_2);
                $('#btngr3').html(TAG_A3);
                $('#btngr1').removeClass('active');
                $('#btngr2').addClass('active');
                $('#btngr3').removeClass('active');
                $('.grp1').addClass('sr-only').removeClass('active');
                $('.grp2').removeClass('sr-only').addClass('active');
                $('.grp3').addClass('sr-only').removeClass('active');
        e.preventDefault();
        });
        $(document).on('click keypress','#btngr3',function(e){
                $('#btngr1').html(TAG_A1);
                $('#btngr2').html(TAG_A2);
                $('#btngr3').html(SPAN_3);
                $('#btngr1').removeClass('active');
                $('#btngr2').removeClass('active');
                $('#btngr3').addClass('active');
                $('.grp1').addClass('sr-only').removeClass('active');
                $('.grp2').addClass('sr-only').removeClass('active');
                $('.grp3').removeClass('sr-only').addClass('active');
        e.preventDefault();
        });
});

;
//****************************************************************************************//
//*	script di visualizzazione news su www.unito.it da www.unitonews.it
//*	autore: Alessandro Crivellin
//*	sviluppato da: sezione Prototipazione e management dei servizi ICT - Direzione Sistemi Informativi, Portale, E-learning - Università degli Studi di Torino
//*	data: 20/06/2019 v1.a
//* data: 24/09/2019 v2.c (Christian Dodaro)
//****************************************************************************************//
jQuery(document).ready(function( $ ) { 
	var unito_video_widget_version='v2.c';
	var UNITO_VIDEO_WIDGET_2019=UNITO_VIDEO_WIDGET_2019||{},
			id_aggancioUN=$('#block-block-10'),
			TXT_PUBBLICATO='Pubblicato il ',
			TXT_ALL='tutti i video',
			A_TITLE='Vedi altri',
			BTN_GROUP = '<div class="text-center"><ul class="pagination dot-pagination"><li id="btngr1V" class="active"><span>1</span></li><li id="btngr2V" class=""><a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">2</a></li><li id="btngr3V" class=""><a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">3</a></li></ul></div>';
			SPAN_1='<span>1</span>',SPAN_2='<span>2</span>',SPAN_3='<span>3</span>',
			TAG_A1='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">1</a>',
			TAG_A2='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">2</a>',
			TAG_A3='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">3</a>',
			URL_ALL='https://media.unito.it/?section=OnDemand&categories=&formats=&channels=&targets=&mediatypes=video&searchtext=&order_for=lasts',
			url_ws='https://media.unito.it/video_portal_ws/wsvideoportal.php?callback=?',
			contenitore='<div id="containerUNV" class="vista-hp"></div>';
	id_aggancioUN.append(contenitore);
	var id_contenitoreUN=$('#containerUNV');
	UNITO_VIDEO_WIDGET_2019.Render=function (data,id_contenitore){ 
		var items='',chrSI=/"/g,chrNO="'",header='<div id="headerUNV" class="vista-hp" role="region" aria-live="polite"></div>',id_header=$('#headerUNV'),
			footerUN=''+BTN_GROUP+'<div class="d-flex align-items-center justify-content-end mt-2"><div class="more-link"><a href="'+URL_ALL+'">'+TXT_ALL+'</a></div><div class="material-icons testonav">keyboard_arrow_right</div></div>',cont=0;
		console.log(data);
		$.each(data,function(key,val){
			
			var altOK=val.TITOLO;
			altOK.replace(chrSI,chrNO);
			if(key%3==0){//raggruppo per 3 card
				items='<div class="card-deck grp'+(++cont)+'V">';
			 }
			items+='<div class="card"><div class="hp-immagine card-img-top"><a href="'+val.URL+'"><img typeof="foaf:Image" class="img-responsive" src="'+val.ANTEPRIMA_URL+'" alt="'+altOK+' " width="512" height="295"/></a></div>';
			items+='<div class="card-body">';
			items+='<p class="card-text"><a href="'+val.URL+'">'+val.TITOLO+'</a></p>';
			items+='</div></div>';
			if(key%3==2){//chiudo raggruppamento card
				items+='</div>';
				id_contenitoreUN.append(items)
			}
		});
		$('.grp2V').addClass('sr-only');
		$('.grp3V').addClass('sr-only');
		id_contenitoreUN.append(footerUN);
	};
	UNITO_VIDEO_WIDGET_2019.initView= function(){
		id_contenitoreUN.hide();
		$.ajax({
			type:"POST",
			url:url_ws,
			timeout:5000,
			scriptCharset:'utf-8',
			crossDoman:true,
			dataType:'jsonp',
			success:function(data){
				id_contenitoreUN.show();
				UNITO_VIDEO_WIDGET_2019.Render(data,id_contenitoreUN);
			},
			error:function(){id_aggancioUN.html('');}
		}); 
	};
	UNITO_VIDEO_WIDGET_2019.initView();	
	$(document).on('click keypress','#btngr1V',function(e){
		$('#btngr1V').html(SPAN_1);
		$('#btngr2V').html(TAG_A2);
		$('#btngr3V').html(TAG_A3);
		$('#btngr1V').addClass('active');
		$('#btngr2V').removeClass('active');
		$('#btngr3V').removeClass('active');
		$('.grp1V').removeClass('sr-only').addClass('active');
		$('.grp2V').addClass('sr-only').removeClass('active');
		$('.grp3V').addClass('sr-only').removeClass('active');
    	e.preventDefault();
	});
	$(document).on('click keypress','#btngr2V',function(e){ 
		$('#btngr1V').html(TAG_A1);
		$('#btngr2V').html(SPAN_2);
		$('#btngr3V').html(TAG_A3);
		$('#btngr1V').removeClass('active');
		$('#btngr2V').addClass('active');
		$('#btngr3V').removeClass('active');
		$('.grp1V').addClass('sr-only').removeClass('active');
		$('.grp2V').removeClass('sr-only').addClass('active');
		$('.grp3V').addClass('sr-only').removeClass('active');
    	e.preventDefault();
	});
	$(document).on('click keypress','#btngr3V',function(e){ 
		$('#btngr1V').html(TAG_A1);
		$('#btngr2V').html(TAG_A2);
		$('#btngr3V').html(SPAN_3);
		$('#btngr1V').removeClass('active');
		$('#btngr2V').removeClass('active');
		$('#btngr3V').addClass('active');
		$('.grp1V').addClass('sr-only').removeClass('active');
		$('.grp2V').addClass('sr-only').removeClass('active');
		$('.grp3V').removeClass('sr-only').addClass('active');
    	e.preventDefault();
	});
});;
/**
 * @file
 */

(function ($) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, settings) {
    if (!settings.hasOwnProperty('extlink')) {
      return;
    }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3$6');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (settings.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (settings.extlink.extInclude) {
      extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (settings.extlink.extExclude) {
      extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (settings.extlink.extCssExclude) {
      extCssExclude = settings.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (settings.extlink.extCssExplicit) {
      extCssExplicit = settings.extlink.extCssExplicit;
    }

    // Define the jQuery method (either 'append' or 'prepend') of placing the icon, defaults to 'append'.
    var extIconPlacement = settings.extlink.extIconPlacement || 'append';

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not([data-extlink]), area:not([data-extlink])', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          external_links.push(this);
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (settings.extlink.extClass) {
      Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass, extIconPlacement);
    }

    if (settings.extlink.mailtoClass) {
      Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass, extIconPlacement);
    }

    if (settings.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).attr('target', settings.extlink.extTarget);
      // Add rel attributes noopener and noreferrer.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the values noopener and noreferrer.
        if (val == null) {
          return 'noopener noreferrer';
        }
        // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
        if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          if (val.indexOf('noreferrer') === -1) {
            return val + ' noreferrer';
          }
          // Both noopener and noreferrer exist. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener and noreferrer to val.
        else {
          return val + ' noopener noreferrer';
        }
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (settings.extlink.extAlert) {
        return confirm(settings.extlink.extAlertText);
      }
    };

    $(external_links).click(function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   * @param {string} icon_placement
   *   'append' or 'prepend' the icon to the link.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name, icon_placement) {
    var $links_to_process;
    if (Drupal.settings.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }
    // Add data-extlink attribute.
    $links_to_process.attr('data-extlink', '');
    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if ($link.css('display') === 'inline' || $link.css('display') === 'inline-block') {
        if (Drupal.settings.extlink.extUseFontAwesome) {
          if (class_name === Drupal.settings.extlink.mailtoClass) {
            $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="fa fa-envelope-o" title="' + Drupal.settings.extlink.mailtoLabel + '"></span><span class="element-invisible">' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
          }
          else {
            $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="fa fa-external-link" title="' + Drupal.settings.extlink.extLabel + '"></span><span class="element-invisible">' + Drupal.settings.extlink.extLabel + '</span></span>');
          }
        }
        else {
          if (class_name === Drupal.settings.extlink.mailtoClass) {
            $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
          }
          else {
            $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.extlink.extLabel + '</span></span>');
          }
        }
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, settings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, settings);
    }
  };

})(jQuery);
;
function calendar_go(dir) {
  (function ($) {
    $("#calendar-body").html("<div class='calendar_loader'><div></div></div>" + $("#calendar-body").html());
    $.get(Drupal.settings.basePath + "calendar_get/" + $(".calendar-" + dir).parent().data("rel"), function(data){
      $("#calendar-body").html(" ");
      $("#calendar-body").append(data);
      $("#calendar-body").find('.dev-query').remove();

      var parts = $('.month-title').text().split(' ');
      parts[0] = get_translated_month(parts[0]);
      $('.month-title').text(parts.join(' '));

      $("#calendar-body .calendar-daynames .calendar-value").each(function(){
        $(this).html($(this).html().substr(0,2) + '<span class="third-letter">' + $(this).html().substr(2,1) + '</span>');
      });

    });
    get_translated_month = function($name){
    if(~$( "html" ).attr('lang').indexOf('it')){
      switch ($name){
        case 'January':
          return 'Gennaio';
        case 'February':
          return 'Febbraio';
        case 'March':
          return 'Marzo';
        case 'April':
          return 'Aprile';
        case 'May':
          return 'Maggio';
        case 'June':
          return 'Giugno';
        case 'July':
          return 'Luglio';
        case 'August':
          return 'Agosto';
        case 'September':
          return 'Settembre';
        case 'October':
          return 'Ottobre';
        case 'November':
          return 'Novembre';
        case 'December':
          return 'Dicembre';
          default :
            return $name;
      }
    }else{
      switch($name){
        case 'Gennaio':
          return 'January';
        case 'Febbraio':
          return 'February';
        case 'Marzo':
          return 'March';
        case 'Aprile':
          return 'April';
        case 'Maggio':
          return 'May';
        case 'Giugno':
          return 'June';
        case 'Luglio':
          return 'July';
        case 'Agosto':
          return 'August';
        case 'Settembre':
          return 'September';
        case 'Ottobre':
          return 'October';
        case 'Novembre':
          return 'November';
        case 'Dicembre':
          return 'December';
          default :
            return $name;
      }
    }
  }
  })(jQuery);
}
;
