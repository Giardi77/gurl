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
