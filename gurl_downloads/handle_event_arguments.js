
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
