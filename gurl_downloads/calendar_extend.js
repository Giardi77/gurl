
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
