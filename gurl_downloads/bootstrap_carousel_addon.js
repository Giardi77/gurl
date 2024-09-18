jQuery(document).ready(function($) {
// nuova parte: gestisce i tasti play/pause nel carousel
	$('.playButton').click(function (e) {
		e.preventDefault();
		$(this).addClass("on").removeClass("off");
		$(this).siblings().addClass("off").removeClass("on");
    	$(this).parents('.carousel').carousel('cycle');
	});
	$('.pauseButton').click(function (e) {
		e.preventDefault();
		$(this).addClass("on").removeClass("off");
		$(this).siblings().addClass("off").removeClass("on");
    	$(this).parents('.carousel').carousel('pause');
	});

});
