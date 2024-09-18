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
