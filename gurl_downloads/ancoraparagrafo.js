
(function ($,Drupal) {

  // Fix on page reload perde la funzionalità l'ancora
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
   * NOTA: l'ordine di chiamata in .info è importante. Prima
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
   * e l'ancora non funziona se l'elemento è hidden.
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
