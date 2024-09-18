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
  per nascondere il campo Iniziative quando è valorizzato PNRR nella field
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
