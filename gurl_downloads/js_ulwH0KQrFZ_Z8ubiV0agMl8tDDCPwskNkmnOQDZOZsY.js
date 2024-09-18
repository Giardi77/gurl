(function($){
  $.fn.Paginator = function(options) {
        var defaults = {
            items: 5,
            active: "currentPageButton",
            pagination_id: "page_navigation",
            firstPageText: '<<',
            firstPageTitle: 'prima pagina',
            firstPageClass: 'firstbutton',
            previousPageText: '<',
            previousPageTitle: 'pagina precedente',
            previousPageClass: 'prevbutton',
            nextPageText: '>',
            nextPageTitle: 'prossima pagina',
            nextPageClass: 'nextbutton',
            lastPageText: '>>',
            lastPageTitle: 'ultima pagina',
            lastPageClass: 'lastbutton',
            buttonClass: "numericButton",
            mobile:false,
        };

        var options = $.extend(defaults, options);
        return this.each(function() {

          obj = $(this);
          // this is how you call the option passed in by plugin of items
          var show_per_page = options.items;
          //getting the amount of elements inside parent element
          var number_of_items = obj.children().size();
          //calculate the number of pages we are going to have
          var number_of_pages = Math.ceil(number_of_items/show_per_page);

          //create the pages of the pagination
          var array_of_elements = [];
          var numP = 0;
          var nexP = show_per_page;
          //loop through all pages and assign elements into array
          for (i=1;i<=number_of_pages;i++){
            array_of_elements[i] = obj.children().slice(numP, nexP);
            numP += show_per_page;
            nexP += show_per_page;
          }


          createPager = function(page){

            var items = '';
            var start = '<div id="'+options.pagination_id+'" class="'+options.pagination_id+'">';
            var first = '<a class="'+options.firstPageClass+'" title="'+options.firstPageTitle+'" href="#">'+options.firstPageText+'</a>';
            var previous = '<a class="'+options.previousPageClass+'" title="'+options.previousPageTitle+'" href="#">'+options.previousPageText+'</a>';
            var next = '<a class="'+options.nextPageClass+'" title="'+options.nextPageTitle+'" href="#">'+options.nextPageText+'</a>';
            var last = '<a class="'+options.lastPageClass+'" title="'+options.lastPageTitle+'" href="#">'+options.lastPageText+'</a>';
            var end = '</div>';

            var pages_range = paginationCalculator(page);

            for (i=1;i<=number_of_pages;i++){
                if (i >= pages_range.start && i <= pages_range.end) {
                  if (i == page) {
                    _classes = (options.mobile) ? options.active + ' hidden' : options.active;
                    items += "<a class='"+ _classes +"' href=\"#\" longdesc='" + i + "' title='"+i+"'>" + (i) + "</a>";
                  }else {
                    _classes = (options.mobile) ? options.buttonClass + ' hidden' : options.buttonClass;
                    items += "<a class='" + _classes + "' href=\"#\" longdesc='" + i + "' title='"+i+"'>" + (i) + "</a>";
                  }
                }
            }


            console.log(page);
            if (page != 1 && page != number_of_pages) {
                if(options.mobile){
                    nav = start + previous + items + next + end;
                }else{
                  nav = start + first + previous + items + next + last + end;
                }
            } else if (number_of_pages == 1) {
                if(options.mobile && array_of_elements[1].length > 1){
                  nav = start + items + next + end;
                }else{
                  nav = '';
                }
            } else if (page == number_of_pages){
                if(options.mobile){
                  nav = start + previous + items  + end;
                }else{
                  nav = start + first + previous + items  + end;
                }
            } else if (page == 1) {
              if(options.mobile){
                nav = start + items + next + end;
              }else{
                nav = start + items + next + last + end;
              }
            }
            obj.after(nav);
          }


          //show selected page
          showPage = function(page,mobile_first){
            obj.children().hide();
            array_of_elements[page].show();
            if(options.mobile && page == 1 && mobile_first){
              array_of_elements[page].not(":eq(0)").hide();
            }
          }

          showPage(1,true);
          createPager(1);

          function paginationCalculator(curr)  {
            var half = 2;
            var upper_limit = number_of_pages - 5;
            var start = curr > half ? Math.max( Math.min(curr - half, upper_limit), 0 ) : 0;
            var end = curr > half ? Math.min(curr + 3, number_of_pages) : Math.min(5, number_of_pages);
            return {start:start, end:end};
          }

          // handle click on pagination
          $('body').on("click", "."+options.buttonClass, function(e){
              e.preventDefault();
              newcurr = parseInt($(this).text());
              $("."+options.pagination_id).remove();
              showPage(newcurr,false);
              createPager(newcurr);
          });
          $('body').on("click", "."+options.nextPageClass,  function(e) {
              e.preventDefault();

              if(options.mobile && parseInt($("#"+options.pagination_id).find("."+options.active).attr("title")) == 1){
                var hiddens = false;
                $.each(array_of_elements[1],function(key,val){
                  if(array_of_elements[1].eq(key).is(':hidden')){
                    array_of_elements[1].show();
                    hiddens = true;
                    if(obj.children().size() == array_of_elements[1].length) {
                      $('#page_navigation').remove();
                    }
                  }
                });
                if(hiddens){
                  return false;
                }
              }
              var newcurr = parseInt($("#"+options.pagination_id).find("."+options.active).attr("title")) + 1;
              showPage(newcurr,false);
              $("."+options.pagination_id).remove();
              createPager(newcurr);
          });
          $('body').on("click", "."+options.previousPageClass, function(e) {
              e.preventDefault();
              var newcurr = parseInt($("#"+options.pagination_id).find("."+options.active).attr("title")) - 1;
              showPage(newcurr,false);
              $("."+options.pagination_id).remove();
              createPager(newcurr);
          });
          $('body').on("click", "."+options.firstPageClass, function(e) {
            e.preventDefault();
            showPage(1,false);
            $("."+options.pagination_id).remove();
            createPager(1);
          });

          $('body').on("click", "."+options.lastPageClass, function(e) {
            e.preventDefault();
            var newcurr = number_of_pages;
            showPage(newcurr,false);
            $("."+options.pagination_id).remove();
            createPager(newcurr);
          });
        }); // return onject

  }; // $.fn.Paginator
})(jQuery);
;
(function ($) {

  Drupal.behaviors.unito_google_cse = {
    attach: function (context, settings) {
      if ($('#google-cse-results').length) {
	      var rubricaRes = $('#google-cse-results');
	      $.ajax({
	        type: "POST",
	        url:parse_url_params(Drupal.settings.unitoGoogleCSE.urlRubrica),
	        timeout:5000,
	        scriptCharset: 'utf-8',
	        crossDomain:true,
	        dataType:'jsonp',
	        //jsonpCallback:'callback',
	        success:function(data){
	          parse_and_show_result(data,rubricaRes);
	          rubricaRes.show();
	
	          if ( $(window).width() < 786){
	            if(Drupal.settings.unitoGoogleCSE.site_lang == 'it'){
	              next = 'successivi';
	              prev = 'precedenti';
	            }else{
	              next = 'next';
	              prev = 'previous';
	            }
	            $('#wrapRisultato').Paginator({
	              items:5,
	              mobile:true,
	              nextPageText: next,
	              previousPageText: prev,
	            });
	          }else{
	            $('#wrapRisultato').Paginator({
	              items:10,
	            });
	          }
	        },
	        error:function(){
	          //alert('OPS....errore!');
	        }
	      });//fine ajax
	  }
    },
    detach: function (context, settings) {
      $('.inrubrica').remove();
    },
  };


  function parse_url_params(urlrubrica){
    var query = /.*\/search\/google\/(.+)/.exec(document.location.pathname);
    if(query){
      var keyword = decodeURIComponent(query[1]);

      keyword=keyword.trim();
      keyword=keyword.replace('à',"a'");
      keyword=keyword.replace('ò',"o'");
      keyword=keyword.replace('é',"e'");
      keyword=keyword.replace('è',"e'");


      var keys = keyword.split(' ');

      v1=(typeof(keys[0])!='undefined')?keys[0]:null,
      v2=(typeof(keys[1])!='undefined')?keys[1]:null;
      if(v1==null && v2!==null){
        v2=v2.trim();
        urlrubrica = urlrubrica+'&p2='+v2;
      } else if(v2==null && v1!==null){
        v1=v1.trim();
        urlrubrica = urlrubrica+'&p1='+v1;
      } else{
        v1=v1.trim();
        v2=v2.trim();
        urlrubrica=urlrubrica+'&p1='+v1+'&p2='+v2;
      }
    }
    return urlrubrica;
  }

  function parse_and_show_result(data,rubricaRes){
    var jsonObj = jQuery.parseJSON(JSON.stringify(data));
    var dim=jsonObj.items.length;
    if(dim == 0){
      $('#google-cse-results').css({"float":"none"}).css({"width":"100%"});
      return false;
    }
    if(Drupal.settings.unitoGoogleCSE.site_lang == 'it'){
      fill_html_object(dim,jsonObj).insertAfter(rubricaRes);
    }else{
      fill_en_html_object(dim,jsonObj).insertAfter(rubricaRes);
    }

  }

  function fill_html_object(dim,jsonObj){
    var htm = '';
    htm+='<div class="inrubrica"><h1 class="gsc-tabHeader gsc-inline-block gsc-tabhActive"  id="tabrubrica">RUBRICA</h1>';
    htm+='<p><br><strong>trovati '+dim+ (dim>1?' contatti':' contatto') +' in Unito.it</strong><p>';
    htm+='<p><a href="https://rubrica.unito.it/" title="Cerca nella rubrica" target="_blank">Cerca nella rubrica di Unito.it</a></p>';
    htm+='<p><span><i>Per dettagli, link e avvisi è possibile cliccare direttamente sul nome della persona</i></span></p>';
    htm+='<div class="inrubrica_wra">';
    htm+='<div id="wrapRisultato">';

    for(var i=0;i<dim;i++){
      htm+=(i>0)?'<div class="risultato wrapnomobile">':'<div class="risultato wrapsimobile">';
      htm+='<h2><a href="'+jsonObj.items[i].URL_IT+'" target="_blank" title="visualizza in rubrica">'+jsonObj.items[i].NOME+' '+jsonObj.items[i].COGNOME+'</a></h2> ';
      htm+=((jsonObj.items[i].TEL_UFFICIO!=null) ? '<p><strong>Telefono:</strong><a href="tel:'+ jsonObj.items[i].TEL_UFFICIO+'"> '+ jsonObj.items[i].TEL_UFFICIO + '</a></p>' : '');
      htm+=((jsonObj.items[i].FAX_UFFICIO!=null) ? '<p><strong>Fax:</strong> '+ jsonObj.items[i].FAX_UFFICIO + '</p>' : '');
      htm+=((jsonObj.items[i].EMAIL_UFFICIO!=null) ? '<p><strong>E-Mail:</strong><a href="mailto:'+ jsonObj.items[i].EMAIL_UFFICIO+'"> '+ jsonObj.items[i].EMAIL_UFFICIO + '</a></p>' : '');
      //htm+=((jsonObj.items[i].S_AFF_DES!=null) ? '<p><strong>Struttura di Afferenza:</strong> '+ jsonObj.items[i].S_AFF_DES + '</p>' : '');//todo
      htm+=((jsonObj.items[i].S_LAV_DES!=null) ? '<p><strong>Struttura di Lavoro:</strong> '+ jsonObj.items[i].S_LAV_DES + '</p>' : '');//todo
      htm+='</div>';
    }
    htm+='</div>';
    htm+='</div>';
    htm+='</div>';

    return $(htm);
  }
  function fill_en_html_object(dim,jsonObj){
    var htm = '';
    htm+='<div class="inrubrica"><h1 class="gsc-tabHeader gsc-inline-block gsc-tabhActive"  id="tabrubrica">People directory</h1>';
    htm+='<p><strong>found '+dim+ (dim>1?' contacts':' contact') +' in Unito.it</strong></p>';
    htm+='<p><a href="https://rubrica.unito.it/index.php?lang=eng" title="Search contacts" target="_blank">Search contacts</a></p>';
    htm+='<p><span><i>More details are avaible by clicking on the contact name</i></span></p>';
    htm+='<div class="inrubrica_wra">';
    htm+='<div id="wrapRisultato">';

    for(var i=0;i<dim;i++){
      htm+=(i>0)?'<div class="risultato wrapnomobile">':'<div class="risultato wrapsimobile">';
      htm+='<h2><a href="'+jsonObj.items[i].URL_EN+'" target="_blank" title="view more details">'+jsonObj.items[i].NOME+' '+jsonObj.items[i].COGNOME+'</a></h2> ';
      htm+=((jsonObj.items[i].TEL_UFFICIO!=null) ? '<p><strong>Telephone:</strong><a href="tel:'+ jsonObj.items[i].TEL_UFFICIO+'"> '+ jsonObj.items[i].TEL_UFFICIO + '</a></p>' : '');
      htm+=((jsonObj.items[i].FAX_UFFICIO!=null) ? '<p><strong>Fax:</strong> '+ jsonObj.items[i].FAX_UFFICIO + '</p>' : '');
      htm+=((jsonObj.items[i].EMAIL_UFFICIO!=null) ? '<p><strong>E-Mail:</strong><a href="mailto:'+ jsonObj.items[i].EMAIL_UFFICIO+'"> '+ jsonObj.items[i].EMAIL_UFFICIO + '</a></p>' : '');
      //htm+=((jsonObj.items[i].S_AFF_DES!=null) ? '<p><strong>Structure you belong to:</strong> '+ jsonObj.items[i].S_AFF_DES + '</p>' : '');//todo
      htm+=((jsonObj.items[i].S_LAV_DES!=null) ? '<p><strong>Structure you work in:</strong> '+ jsonObj.items[i].S_LAV_DES + '</p>' : '');//todo
      htm+='</div>';
    }

    htm+='</div>';
    htm+='</div>';
    htm+='</div>';

    return $(htm);
  }

})(jQuery);
;
