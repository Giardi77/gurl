(function ($,Drupal) {
	Drupal.behaviors.degree_programs_order = {
	    attach: function(context,settings) {
			   // alter_views_results_order_by_type(context,settings);
			   alter_views_results_grouping_order();
	    },
	    dettach: function(context,settings) {},
    }
    alter_views_results_grouping_order = function(){
    	try{
    		let exists = $('.view.view-ugov-view-degree.view-display-id-block_5.elencocorsi').length;
    		if(exists){
    			let vista = $('.view.view-ugov-view-degree.view-display-id-block_5.elencocorsi');

					var alphabeticallyOrderedDivs = $('.view-grouping').sort(function(a, b) {
					  var $aTitle = $(a).find('.view-grouping-header'), $bTitle = $(b).find('.view-grouping-header');
					  return String.prototype.localeCompare.call($aTitle.text().toLowerCase(), $bTitle.text().toLowerCase());
					});

					var container = vista.children('.view-content');
					container.empty().append(alphabeticallyOrderedDivs);
    		}
    		let _exists = $('.view.view-ugov-view-degree.view-display-id-block_4.elencocorsi').length;
    		if(_exists){
    			let vista = $('.view.view-ugov-view-degree.view-display-id-block_4.elencocorsi');

    			vista.find('.item-list').each(function(){
						var orderedDivs = $(this).find('ul > li').sort(function(a, b) {
						  var $aTitle = $(a).find('div:first-child > span > a');
						  var $bTitle = $(b).find('div:first-child > span > a');
						  return String.prototype.localeCompare.call($aTitle.text().toLowerCase(), $bTitle.text().toLowerCase());
						});
						// console.log(orderedDivs);
						var container = $(this).children('ul');
						container.empty().append(orderedDivs);
    			});
    		}
    	}catch(error){console.log(error);}
    }

    alter_views_results_order_by_type = function(context,settings){
      try{
	    let exists = $('#block-quicktabs-elenco-corsi').length;
	    if(exists){
	      let vista = $('.view-ugov-view-degree.view-display-id-block_7');
	      vista.find('.item-list').each(function(){
	        if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      let magistrale = vista.find('.item-list.laurea-magistrale')
	      let ciclo = vista.find('.item-list.laurea-magistrale-a-ciclo-unico');
	      magistrale.insertAfter(ciclo);
	      
	      vista = $('.view-ugov-view-degree.view-display-id-block_5');
	      let tipo = vista.find('.view-grouping-content > .item-list');
	      tipo.each(function(){
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      vista.find('.view-grouping-content').each(function(){
	      	magistrale = $(this).find('.item-list.laurea-magistrale');
	      	ciclo = $(this).find('.item-list.laurea-magistrale-a-ciclo-unico');
	      	magistrale.insertAfter(ciclo);
	      });
	      vista = $('.view-ugov-view-degree.view-display-id-block_13');
	      vista.find('.item-list').each(function(){
	        if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale')){
		   		$(this).addClass('laurea-magistrale');
		   	}
		   	if(~$(this).children('h3:first').text().indexOf('Laurea Magistrale a Ciclo Unico')){
		   		$(this).addClass('laurea-magistrale-a-ciclo-unico');	
		   	}
	      });
	      magistrale = vista.find('.item-list.laurea-magistrale')
	      ciclo = vista.find('.item-list.laurea-magistrale-a-ciclo-unico');
	      magistrale.insertAfter(ciclo);
	      
	    }
      }catch(error){
        console.log(error);
      }
    }

})(jQuery,Drupal);