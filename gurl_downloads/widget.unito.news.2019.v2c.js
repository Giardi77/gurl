//****************************************************************************************//
//*     script di visualizzazione news su www.unito.it da www.unitonews.it
//*     autore: Alessandro Crivellin
//*     sviluppato da: sezione Prototipazione e management dei servizi ICT - Direzione Sistemi Informativi, Portale, E-learning - Universit▒ degli Studi di Torino
//*     data: 10/09/2019 v2
//* data: 24/09/2019 v2.c (Christian Dodaro)
//****************************************************************************************//
jQuery(document).ready(function( $ ) {
        var unito_news_widget_version='v2.c';
        var UNITO_NEWS_WIDGET_2019=UNITO_NEWS_WIDGET_2019||{},
                        id_aggancioUN=$('#block-block-9'),
                        TXT_PUBBLICATO='Pubblicato il ',
                        TXT_ALL='tutte le notizie ',
                        A_TITLE='vedi altre notizie',
                        BTN_GROUP = '<div class="text-center"><ul class="pagination dot-pagination"><li id="btngr1" class="active"><span>1</span></li><li id="btngr2"><a title="'+A_TITLE+'" href="#" >2</a></li><li id="btngr3"><a title="'+A_TITLE+'" href="#" >3</a></li></ul></div>';
                        SPAN_1='<span>1</span>',SPAN_2='<span>2</span>',SPAN_3='<span>3</span>',
                        TAG_A1='<a title="'+A_TITLE+'" href="#" >1</a>',
                        TAG_A2='<a title="'+A_TITLE+'" href="#" >2</a>',
                        TAG_A3='<a title="'+A_TITLE+'" href="#" >3</a>',
                        URL_ALL_1='http://www.unitonews.it',
                        NUM_ITEMS=9,
                        url_ws='https://www.unitonews.it/index.php/unito_export/'+NUM_ITEMS+'?cb=?',
                        contenitore='<div id="containerUN" class="vista-hp" role="region" aria-live="polite"></div>';
        id_aggancioUN.append(contenitore);
        var id_contenitoreUN=$('#containerUN');
        UNITO_NEWS_WIDGET_2019.formattaData=function formatData(ladata,con_ora){
                var data_ora=ladata.split(' '),ora=data_ora[1],solodata=data_ora[0];
                solodata=solodata.split('-');
                if(con_ora==true){return (solodata[2]+'/'+solodata[1]+'/'+solodata[0]+' '+ora);}
                else{return (solodata[2]+'/'+solodata[1]+'/'+solodata[0]);}
        };
        UNITO_NEWS_WIDGET_2019.Render=function (data,id_contenitore){
                var items='',chrSI=/"/g,chrNO="'",header='<div id="headerUN"></div>',id_header=$('#headerUN'),
                        footerUN=''+BTN_GROUP+'<div class="d-flex align-items-center justify-content-end mt-2"><div class="more-link"><a href="'+URL_ALL_1+'">'+TXT_ALL+'</a></div><div class="material-icons testonav">keyboard_arrow_right</div></div>',cont=0;
                $.each(data,function(key,val){
                        var altOK=val.title;
                        altOK.replace(chrSI,chrNO);
                        if(key%3==0){//raggruppo per 3 card
                                items='<div  role="region" class="view-content card-deck grp'+(++cont)+'" aria-live="polite">';
                         }
                        items+='<div class="card"><div class="hp-immagine card-img-top"><a href="'+val.completeUrl+'"><img typeof="foaf:Image" class="img-responsive" src="'+val.coverImageUrl+'" alt="'+altOK+' " width="512" height="295"/></a></div>';
                        items+='<div class="card-body">';
                        items+='<p class="card-text"><a href="'+val.completeUrl+'">'+val.title+'</a></p>';
                        items+='<p class="card-text"><span class="card-date">'+TXT_PUBBLICATO+'<span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="'+val.created+'">'+UNITO_NEWS_WIDGET_2019.formattaData(val.created,false)+'</span></span></p>';
                        items+='</div></div>';
                        if(key%3==2){//chiudo raggruppamento card
                                items+='</div>';
                                id_contenitoreUN.append(items)
                        }
                });
                $('.grp2').addClass('sr-only');
                $('.grp3').addClass('sr-only');
                id_contenitoreUN.append(footerUN);
        };
        UNITO_NEWS_WIDGET_2019.initView= function(){
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
                                UNITO_NEWS_WIDGET_2019.Render(data,id_contenitoreUN);
                        },
                        error:function(){id_aggancioUN.html('');}
                });
        };
        UNITO_NEWS_WIDGET_2019.initView();

        $(document).on('click keypress','#btngr1',function(e){
                $('#btngr1').html(SPAN_1);
                $('#btngr2').html(TAG_A2);
                $('#btngr3').html(TAG_A3);
                $('#btngr1').addClass('active');
                $('#btngr2').removeClass('active');
                $('#btngr3').removeClass('active');
                $('.grp1').removeClass('sr-only').addClass('active');
                $('.grp2').addClass('sr-only').removeClass('active');
                $('.grp3').addClass('sr-only').removeClass('active');
        e.preventDefault();
        });
        $(document).on('click keypress','#btngr2',function(e){
                $('#btngr1').html(TAG_A1);
                $('#btngr2').html(SPAN_2);
                $('#btngr3').html(TAG_A3);
                $('#btngr1').removeClass('active');
                $('#btngr2').addClass('active');
                $('#btngr3').removeClass('active');
                $('.grp1').addClass('sr-only').removeClass('active');
                $('.grp2').removeClass('sr-only').addClass('active');
                $('.grp3').addClass('sr-only').removeClass('active');
        e.preventDefault();
        });
        $(document).on('click keypress','#btngr3',function(e){
                $('#btngr1').html(TAG_A1);
                $('#btngr2').html(TAG_A2);
                $('#btngr3').html(SPAN_3);
                $('#btngr1').removeClass('active');
                $('#btngr2').removeClass('active');
                $('#btngr3').addClass('active');
                $('.grp1').addClass('sr-only').removeClass('active');
                $('.grp2').addClass('sr-only').removeClass('active');
                $('.grp3').removeClass('sr-only').addClass('active');
        e.preventDefault();
        });
});

