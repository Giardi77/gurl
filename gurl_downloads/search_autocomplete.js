(function ($,Drupal) {
  let waitForEl = function(selector, callback) {
    if ($(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        waitForEl(selector, callback);
      }, 100);
    }
  };
	Drupal.behaviors.search_corsi_autocomplete = {
	    attach: function(context,settings) {
         try{
          autocomplete_html_setup();
          autocomplete_submit_btn_alter();
  			  autocomplete_result_submit_behavior();  
          autocomplete_reset_behavior();
          overrideAutocompleteFoundMethod();
          clearInputOnPageLoad();

         }catch(error){console.log(error);}
	    },
	    dettach: function(context,settings) {},
    }
    autocomplete_html_setup = function(){
      try{
        if($('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length){
           $('.filtra').remove();
           var total = $('.field-collection-container').find('.field-items').first().children();
           var field = $('.field-collection-container').find('.field-items')
                                           .first()
                                           .children().last();
           var block = $('#block-views-3dc6531e9e7aad0210eeb9d4c46b4006');
           if(total.length > 1){
            block.insertBefore(field);
           }

        }
      }catch(error){console.log(error);}
    }
    autocomplete_submit_btn_alter = function(){
      var root = $('#views-exposed-form-ugov-corsi-di-studio-ricerca-block');
      var wrapper = root.find('.form-item-corso.form-type-textfield.form-autocomplete .input-group');
      wrapper.find('.input-group-addon span')
             .removeClass('glyphicon-refresh')
             .addClass('glyphicon-search');
      wrapper.find('.input-group-addon span').on('click',function(){
        root.find('.btn.btn-default.form-submit.btn-primary').trigger('click');

      });
      if(root.parent('.view-filters').next('.view-empty').length){
        var root2 = $('#block-quicktabs-elenco-corsi');
        root2.find('.view-empty').remove();
        root2.prepend(root.parent('.view-filters').next('.view-empty'));
      }
    }
    autocomplete_reset_behavior = function(){
      if($('#views-exposed-form-ugov-corsi-di-studio-ricerca-block').length){
        root = $('#views-exposed-form-ugov-corsi-di-studio-ricerca-block');
        reset_btn = root.find('.views-reset-button .form-submit');
        submit = root.find('.views-submit-button .form-submit');
        $(document).delegate('.views-reset-button .form-submit','click',function(event){
              event.preventDefault();
              $('form').each(function(){
                $('form input[type=text]').attr('value', '');
                this.reset();
              });
              let root = $('#block-quicktabs-elenco-corsi');
              root.find('.hide-unawanted-results').each(function(){
               $(this).removeClass('hide-unawanted-results');
              });
              $('.view.view-ugov-corsi-di-studio-ricerca .view-content').remove();
              return false;
        });
      }
    }
    // Attendo i risultati del filtro esposto, per filtrare quicktabs di seguito
    autocomplete_result_submit_behavior = function(){
    if($('[id^="edit-submit-ugov-corsi-di-studio-ricerca"]').length === 0){
    	return;
    }
    if($('#volatile-results').length){
       $('#volatile-results').remove();
    }
    $('[id^="edit-submit-ugov-corsi-di-studio-ricerca"]').on('click',function(){
       let root = $('#block-quicktabs-elenco-corsi');
       root.find('.hide-unawanted-results').each(function(){
        $(this).removeClass('hide-unawanted-results');
       });
       let selector = '.view.view-ugov-corsi-di-studio-ricerca .view-content';
       var that = $(this);
       waitForEl(selector, function() {
          let elements = $('.view.view-ugov-corsi-di-studio-ricerca .view-content .views-field a');
          let results = [];
          elements.each(function(){
            var origin   = window.location.origin;
            results.push(origin+$(this).attr('href'));
          });
          hide_elements_if_not_in_results(results,that);
          $('.view.view-ugov-corsi-di-studio-ricerca .view-content').remove();
       });
    });
  }
    hide_elements_if_not_in_results = function(results,that){   
    let root = $('#block-quicktabs-elenco-corsi');
    if(root.length === 0){
    	return;
    }
    root.find('.view-content .views-row .field-content a').each(function(){
      if($.inArray($(this).attr('href'), results) === -1){
        $(this).parentsUntil('ul').addClass('hide-unawanted-results'); 
      }
    });
    root.find('.view-content').children().each(function(){
      if($(this).find('li:not(.hide-unawanted-results)').length == 0){
        $(this).addClass('hide-unawanted-results');
      }
    });
    root.find('.view-grouping:not(.hide-unawanted-results)').each(function(){
      $(this).children('.view-grouping-content').each(function(){
        $(this).children('.item-list').each(function(){
          if($(this).find('li:not(.hide-unawanted-results)').length == 0){
            $(this).addClass('hide-unawanted-results');
          }
        });
      });
    });
    root.find('#panel-group-quickset-elenco_corsi').children().each(function(){
      if($(this).find('.view-content').children('div:not(.hide-unawanted-results)').length == 0){
        $(this).addClass('hide-unawanted-results');
      }
    });
    applyCounter(root,results,that);
  }
    applyCounter = function(root,results,that){
    let stringa = that.closest('div')
                      .prev('.views-widget-filter-nome_esteso')
                      .find('input').val();
    let totalFound = 0;
    let dupplicates = [];
    root.find('.view-empty').remove();
    root.find('.view-content .views-row .field-content a').each(function(){
      if($.inArray($(this).attr('href'), results) !== -1){
        if($.inArray($(this).attr('href'), dupplicates) === -1){
          totalFound++;
          dupplicates.push($(this).attr('href'));
        }
      }
    });
    
    var found = 'Trovato';
    if(totalFound > 1){
      found = 'Trovati';
    }
    testo = found+' '+totalFound+' risultati per "'+stringa+'"';
    results = '<div id="volatile-results"><span>'+testo+'</span></div>';
    root.prepend(results);
  }
    // console.log($.type(Drupal.jsAC));
  
    function overrideAutocompleteFoundMethod() {
      if (typeof Drupal.jsAC != 'undefined') {
        var originalFound = Drupal.jsAC.prototype.found;

        Drupal.jsAC.prototype.found = function (matches) {
          originalFound.call(this, matches);

          let inputElement = this.input;  // Save reference to the input element
          let block = "#views-exposed-form-ugov-corsi-di-studio-ricerca-block";
          if($(block).length){
            $(this.popup).find('li').each(function() {
              let $this = $(this);
              let text = $this.text();

              $(block).find('.dropdown ul.dropdown-menu li a div.reference-autocomplete a').each(function(){
                if($(this).text().trim() === text.trim()){
                  var origin = window.location.origin;
                  var href = $(this).attr('href');

                  $this.off('mousedown').on('mousedown', function (e) {
                    e.preventDefault();
                    let a = document.createElement('a');
                    a.target = '_self';
                    a.href = origin + href;

                    // Clear the input value
                    // $(inputElement).val("");

                    a.click();
                  });
                }
              });
            });
          }
        };
      }
    }
    function clearInputOnPageLoad() {
      let block = "#views-exposed-form-ugov-corsi-di-studio-ricerca-block";
      if($(block).length){
        let input = $(block).find('input#edit-corso');
        window.addEventListener("pageshow", function() {
          let val = input.val();
          if (/\<.*?\>/g.test(val)) { // se è HTML
            input.val(''); // svuota l'input
          }
        });
      }
    }

})(jQuery,Drupal);
