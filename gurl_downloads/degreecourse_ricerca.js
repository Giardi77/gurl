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
