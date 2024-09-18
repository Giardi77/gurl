//****************************************************************************************//
//*	script di visualizzazione news su www.unito.it da www.unitonews.it
//*	autore: Alessandro Crivellin
//*	sviluppato da: sezione Prototipazione e management dei servizi ICT - Direzione Sistemi Informativi, Portale, E-learning - Università degli Studi di Torino
//*	data: 20/06/2019 v1.a
//* data: 24/09/2019 v2.c (Christian Dodaro)
//****************************************************************************************//
jQuery(document).ready(function( $ ) { 
	var unito_video_widget_version='v2.c';
	var UNITO_VIDEO_WIDGET_2019=UNITO_VIDEO_WIDGET_2019||{},
			id_aggancioUN=$('#block-block-10'),
			TXT_PUBBLICATO='Pubblicato il ',
			TXT_ALL='tutti i video',
			A_TITLE='Vedi altri',
			BTN_GROUP = '<div class="text-center"><ul class="pagination dot-pagination"><li id="btngr1V" class="active"><span>1</span></li><li id="btngr2V" class=""><a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">2</a></li><li id="btngr3V" class=""><a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">3</a></li></ul></div>';
			SPAN_1='<span>1</span>',SPAN_2='<span>2</span>',SPAN_3='<span>3</span>',
			TAG_A1='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">1</a>',
			TAG_A2='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">2</a>',
			TAG_A3='<a title="'+A_TITLE+'" href="#" aria-controls="containerUNV">3</a>',
			URL_ALL='https://media.unito.it/?section=OnDemand&categories=&formats=&channels=&targets=&mediatypes=video&searchtext=&order_for=lasts',
			url_ws='https://media.unito.it/video_portal_ws/wsvideoportal.php?callback=?',
			contenitore='<div id="containerUNV" class="vista-hp"></div>';
	id_aggancioUN.append(contenitore);
	var id_contenitoreUN=$('#containerUNV');
	UNITO_VIDEO_WIDGET_2019.Render=function (data,id_contenitore){ 
		var items='',chrSI=/"/g,chrNO="'",header='<div id="headerUNV" class="vista-hp" role="region" aria-live="polite"></div>',id_header=$('#headerUNV'),
			footerUN=''+BTN_GROUP+'<div class="d-flex align-items-center justify-content-end mt-2"><div class="more-link"><a href="'+URL_ALL+'">'+TXT_ALL+'</a></div><div class="material-icons testonav">keyboard_arrow_right</div></div>',cont=0;
		console.log(data);
		$.each(data,function(key,val){
			
			var altOK=val.TITOLO;
			altOK.replace(chrSI,chrNO);
			if(key%3==0){//raggruppo per 3 card
				items='<div class="card-deck grp'+(++cont)+'V">';
			 }
			items+='<div class="card"><div class="hp-immagine card-img-top"><a href="'+val.URL+'"><img typeof="foaf:Image" class="img-responsive" src="'+val.ANTEPRIMA_URL+'" alt="'+altOK+' " width="512" height="295"/></a></div>';
			items+='<div class="card-body">';
			items+='<p class="card-text"><a href="'+val.URL+'">'+val.TITOLO+'</a></p>';
			items+='</div></div>';
			if(key%3==2){//chiudo raggruppamento card
				items+='</div>';
				id_contenitoreUN.append(items)
			}
		});
		$('.grp2V').addClass('sr-only');
		$('.grp3V').addClass('sr-only');
		id_contenitoreUN.append(footerUN);
	};
	UNITO_VIDEO_WIDGET_2019.initView= function(){
		id_contenitoreUN.hide();
		$.ajax({
			type:"POST",
			url:url_ws,
			timeout:5000,
			scriptCharset:'utf-8',
			crossDoman:true,
			dataType:'jsonp',
			success:function(data){
				id_contenitoreUN.show();
				UNITO_VIDEO_WIDGET_2019.Render(data,id_contenitoreUN);
			},
			error:function(){id_aggancioUN.html('');}
		}); 
	};
	UNITO_VIDEO_WIDGET_2019.initView();	
	$(document).on('click keypress','#btngr1V',function(e){
		$('#btngr1V').html(SPAN_1);
		$('#btngr2V').html(TAG_A2);
		$('#btngr3V').html(TAG_A3);
		$('#btngr1V').addClass('active');
		$('#btngr2V').removeClass('active');
		$('#btngr3V').removeClass('active');
		$('.grp1V').removeClass('sr-only').addClass('active');
		$('.grp2V').addClass('sr-only').removeClass('active');
		$('.grp3V').addClass('sr-only').removeClass('active');
    	e.preventDefault();
	});
	$(document).on('click keypress','#btngr2V',function(e){ 
		$('#btngr1V').html(TAG_A1);
		$('#btngr2V').html(SPAN_2);
		$('#btngr3V').html(TAG_A3);
		$('#btngr1V').removeClass('active');
		$('#btngr2V').addClass('active');
		$('#btngr3V').removeClass('active');
		$('.grp1V').addClass('sr-only').removeClass('active');
		$('.grp2V').removeClass('sr-only').addClass('active');
		$('.grp3V').addClass('sr-only').removeClass('active');
    	e.preventDefault();
	});
	$(document).on('click keypress','#btngr3V',function(e){ 
		$('#btngr1V').html(TAG_A1);
		$('#btngr2V').html(TAG_A2);
		$('#btngr3V').html(SPAN_3);
		$('#btngr1V').removeClass('active');
		$('#btngr2V').removeClass('active');
		$('#btngr3V').addClass('active');
		$('.grp1V').addClass('sr-only').removeClass('active');
		$('.grp2V').addClass('sr-only').removeClass('active');
		$('.grp3V').removeClass('sr-only').addClass('active');
    	e.preventDefault();
	});
});