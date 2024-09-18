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
