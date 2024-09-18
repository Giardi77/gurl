(function ($,Drupal) {
	Drupal.behaviors.imageCredits = {
	    attach: function(context,settings) {
			   imageCreditsInit();
			   imageCreditsBehavior();
	    },
	    dettach: function(context,settings) {},
    }
    imageCreditsInit = function(){
      try{
        $(document).find('img').each(function(){
		if($(this).is('[data-credits]')){
			var toggler = attachCreditsHtml($(this).data('credits'));
                if($(this).parent('a').length > 0){
				$(this).parent('a').after(toggler);
                }else{
                    $(this).after(toggler);
                }
                alter_wrapper_css_on_mobile();
		}
        });
      }catch(error){
        console.warn(error);
      }
    }
    alter_wrapper_css_on_mobile = function(){
        if ($(window).width() < 700){
            var imageHeight = $('.carousel-inner .item.active img').outerHeight() + 20;
            $('.credits-wrapper').css('bottom',imageHeight);
        }
    }
    attachCreditsHtml = function(msg){
	var out = '<div class="credits-wrapper">';
	out += '<span class="credits">'+msg+'</span>';
	out += '<span class="credits-handler material-icons">copyright</span>';
	out += '</div>'
	return out;
    }
    imageCreditsBehavior = function(){
        try{
		$(document).on('click','.credits-handler',function(){
                var imgWidth = 0;
                if($(this).parent().prev('img').length){
                  imgWidth = $(this).parent().prev('img').attr('width');
                }else if($(this).parent().prev('a').children('img').first().length){
                  imgWidth = $(this).parent().prev('a').children('img').first().attr('width');
                }

                var maxWidth = 512;
                var disc = 40;
                var dec = (disc / 100).toFixed(2);
                var mult = imgWidth * dec;
                var discount = Math.ceil(imgWidth - mult);
                if(discount > maxWidth){
                    maxWidth = discount;
                }
			$(this).prev('span.credits').toggleClass('credits-show');
                $(this).parent().toggleClass('credits-wrapper-active');
                $(this).parent().css("maxWidth", maxWidth);
                $(this).toggleClass('credits-handler-active');
		});
        }catch(error){console.warn(error);}
    }

})(jQuery,Drupal);