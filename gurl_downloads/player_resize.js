jQuery(document).ready(function($) {
   	//alert('resize');
    
    // Calcola la dimensione del div contenitore del player (div.file-video) e imposta le dimensioni corrette in largheza e altezza
	//alert('ready');
	$( "div.file-video" ).each(function(index,fv) {
		var width=320;
		if ( $(fv).parents(".carousel-inner").length ) {	//è un video dentro un carousel
			var width=$(fv).parents(".carousel-inner").width();	//è un video dentro un carousel, la dimensione si adegua al carousel
		} else {
			//non sono dentro un carousel, devo fissare la dimensione del video (es. nel paragrafo)
			var width = $(fv).width() ////Math.min($(fv).width(), 320);
			if (width < 320) width=320;	//fisso una larghezza minima, anche quando width() restituisce 0
		}
		//alert(width);
		//imposto la larghezza dell'elemento iframe
		$(fv).find("iframe").attr('width',width);
		//alert($(fv).find("iframe").width());
		//Imposto l'altezza dell'iframe in base alla sua attuale larghezza, con un rapporto 16/9
		var height = parseInt($(fv).find("iframe").width()/16*9) + 4;
		//alert(height);
		$(fv).find("iframe").attr('height',height);
	});		 
	//$( ".carousel-inner div.file-video" ).each(function(index,fv) {
	//	$(fv).find("iframe").attr('width','100%').attr('height','100%');
	//});		 

//		var width1 = $("div.file-video").width();
//		if (width1 == 0) width1=320;	//fisso una larghezza minima
//		alert (width1);
//		var width = Math.min(width1, 512);
//		var height = parseInt(width/16*9);
//		$("iframe").attr('width',width).attr('height',height+4);// il + 24 serve per considerare la barra del player
//		//alert('resize');

      // In base al resize della finestra si ridimensiona il player per visualizzarsi nella massima dimensione possibile
  $(window).resize(function(){
//	$( "div.file-video" ).each(function(index,fv) {
//		var width1 = $(fv).width();
//		if (width1 == 0) width1=320;	//fisso una larghezza minima
//		var width = Math.min(parseInt(width1), 512);
//		var height = parseInt(width/16*9) + 4;
//		$(fv).find("iframe").attr('width',width).attr('height',height);
//	});		 
//	$( ".carousel-inner div.file-video" ).each(function(index,fv) {
//		$(fv).find("iframe").attr('width','100%').attr('height','100%');
//	});		 
	$( "div.file-video" ).each(function(index,fv) {
		var width=320;
		if ( $(fv).parents(".carousel-inner").length ) {	//è un video dentro un carousel
			var width=$(fv).parents(".carousel-inner").width();	//è un video dentro un carousel, la dimensione si adegua al carousel
		} else {
			//non sono dentro un carousel, devo fissare la dimensione del video (es. nel paragrafo)
			var width = $(fv).width() ////Math.min($(fv).width(), 320);
			if (width < 320) width=320;	//fisso una larghezza minima, anche quando width() restituisce 0
		}
		//alert(width);
		//imposto la larghezza dell'elemento iframe
		$(fv).find("iframe").attr('width',width);
		//alert($(fv).find("iframe").width());
		//Imposto l'altezza dell'iframe in base alla sua attuale larghezza, con un rapporto 16/9
		var height = parseInt($(fv).find("iframe").width()/16*9) + 4;
		//alert(height);
		$(fv).find("iframe").attr('height',height);
	});		 

  });


});


