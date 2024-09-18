
(function ($, Drupal) {

  /**
   * Sul evento apri di un apri-chiudi in pagina,
   * chiude tutti gli altri tab aperti.
   */

  Drupal.behaviors.apriChiudiAccordion = {
    attach: function (context, settings) {

      aprichiudi({
        case: 11,
        container: ".aprichiudi-view.aprichiudi-all",
        header_class: ".view-grouping-header",
        content_class: ".view-grouping-content",
      }, context);
      aprichiudi({
        case: 11,
        container: ".view-offerta-laurea-corso-1.aprichiudi-view.aprichiudi-all",
        header_class: "h3",
        content_class: "ul",
      }, context);
      /*
      aprichiudi({
          case:11,
          container:".view-offerta-af-1.aprichiudi-view",
          header_class: "h3",
          content_class:"ul",
      },context);*/
      aprichiudi({
        case: 11,
        container: ".view-offerta-af-2.aprichiudi-view",
        header_class: "h3",
        content_class: "ul",
      }, context);
      aprichiudi({
        case: 2,
        container: ".aprichiudi-row.aprichiudi-all",
        header_class: ".aprichiudi-titlerow",
        content_class: "div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')",
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudi-opzione-parent.field-collection-item-field-paragrafo",
        header_class: ".aprichiudi-titlerow",
        content_class: "div:not('.aprichiudi-titlerow'), span:not('.aprichiudi-titlerow')",
        root: '.field-collection-container',
      }, context);
      aprichiudi({
        case: 3,
        container: ".group-master.aprichiudi-opzione-parent",
        header_class: ".aprichiudi-titlerow",
        content_class: "*:not('.aprichiudi-titlerow')",
        root: '.view-content',
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudisottopar-opzione-parent.field-collection-item-field-sottoparagrafo-apri-chiudi",
        header_class: ".aprichiudisottopar-titlerow",
        content_class: "div:not('.aprichiudisottopar-titlerow'), span:not('.aprichiudisottopar-titlerow')",
        root: '.field-items',
      }, context);
      aprichiudi({
        case: 3,
        container: ".aprichiudi-wrapper",
        header_class: ".aprichiudi-wrapper h3",
        content_class: "*:not('.aprichiudi-wrapper h3')",
        root: '.view-ugov-view-degreecourse',
      }, context);
      aprichiudi({
        case: 4,
        container: "#block-menu-menu-accesso-rapido .block-inner",
        header_class: "h2",
      }, context);
      aprichiudi({
        case: 4,
        container: "#block-menu-menu-menu-profili .block-inner",
        header_class: "h2",
      }, context);
      aprichiudi({
        case: 4,
        container: ".box-aprichiudi",
        header_class: "span.aprichiudi-titolo",
      }, context);
      aprichiudi({
        case: 5,
        container: ".group-servizio.field-group-div",
        header_class: ".field-group-format-toggler",
        content_class: ".field-group-format-wrapper",
        remove_event: "a.field-group-format-title",
        root: '.views-row',
      }, context);
    },
    dettach: function (context, settings) { },
  }


  aprichiudi = function (params, context) {
    switch (params.case) {
      case 1:
        // unito.js 175,227 -- � diventato case 11 perch� ho parametrizzato il children
        $(params.container).find(params.content_class).hide();

        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent().toggleClass('menu-open');
            $(this).parent().children(".view-grouping-content").slideToggle();
            // accordion style
            $(this).parent().siblings().removeClass('menu-open');
            $(this).parent().siblings().children(".view-grouping-content").slideUp();
          });
        break;
      case 11:
        // nuovo caso

        // PTL-5046 accordion non accessibili / trasformo i div in button per renderli nativamente focussabili da tastiera e semanticamente corretti
        changeInButton(params);

        $(params.container).find(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent().toggleClass('menu-open');
            $(this).parent().children(params.content_class).slideToggle();
            // accordion style
            $(this).parent().siblings().removeClass('menu-open');
            $(this).parent().siblings().children(params.content_class).slideUp();
          });
        break;
      case 2:
        // unito.js 184,238
        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).parent(params.container).toggleClass('menu-open');
            $(this).siblings().slideToggle();
            // accordion style
            if ($(this).parents('.item-list').length) {
              $(this).parents('.item-list').siblings().find(params.container).removeClass('menu-open');
              $(this).parents('.item-list').siblings().find(params.container).children(params.content_class).slideUp();
            }
            $(this).parent(params.container).siblings().removeClass('menu-open');
            $(this).parent(params.container).siblings().children(params.content_class).slideUp();
          });
        break;
      case 3:
        //paragrafo.js 12,33, 23, 44, 17, 39

        // PTL-5046 accordion non accessibili / trasformo i div in button per renderli nativamente focussabili da tastiera e semanticamente corretti
        changeInButton(params);

        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function () {
            $(this).addClass('aprichiudi-current');
            $(this).parents(params.container).toggleClass('menu-open');
            $(this).parents(params.container).children(params.content_class).slideToggle();
            // accordion style
            var siblings = $(this).parents(params.root).find(params.header_class);
            siblings.each(function () {
              if ($(this).hasClass('aprichiudi-current')) {
                $(this).removeClass('aprichiudi-current');
                return true;
              }
              $(this).parents(params.container).removeClass('menu-open');
              $(this).parents(params.container).children(params.content_class).slideUp();
            });

          });

        break;
      case 4:
        //unito.js 81
        if (!params.container.length) {
          return true;
        }
        if (!($(params.container).hasClass('menu-closed') || $(params.container).hasClass('menu-open'))) {
          $(params.container).addClass('menu-closed');
        }
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + ' ' + params.header_class, function () {
            $(this).parent().addClass('toggled');
            if ($(this).parent().hasClass('menu-closed')) {
              $(this).parent().removeClass('menu-closed').addClass('menu-open');
            } else {
              $(this).parent().removeClass('menu-open').addClass('menu-closed');
            }
          });
        break;
      case 5:
        // servizi/servizi-line/tutti-i-servizi-line
        changeInButton(params);

        $(params.remove_event).off('click');
        $(params.container).children(params.content_class).hide();
        $(document).off('click', params.container + ' ' + params.header_class)
          .on('click.ac', params.container + " " + params.header_class, function (e) {

            $(this).addClass('aprichiudi-current');
            // accordion style
            $(this).closest(params.root).siblings().each(function () {
              $(this).find(params.header_class).each(function (ola) {
                $(this).removeClass('aprichiudi-current');
                $(this).parents(params.container).parent().parent().removeClass('collapsed');
                $(this).parents(params.container).children(params.content_class).length;
                $(this).parents(params.container).children(params.content_class).slideUp();
              });
            });
            $(this).parents(params.container).parent().parent().toggleClass('collapsed');
            $(this).parents(params.container).children(params.content_class).slideToggle();
            e.preventDefault();
          });
        break;
      default:
        break;

    }
  }

  changeInButton = function (params) {

    var paramsContainerChildren = $(params.container).find(params.header_class);

    for (let i = 0; i < paramsContainerChildren.length; i++) {
      var buttonElement = document.createElement('button');

      buttonElement.className = paramsContainerChildren[i].classList;
      buttonElement.classList.add("btn--reset");
      buttonElement.innerHTML = paramsContainerChildren[i].textContent || paramsContainerChildren[0].innerText;

      if (params.header_class === 'h3') {
        paramsContainerChildren[i].innerHTML = '';
        paramsContainerChildren[i].append(buttonElement);
      } else {
        paramsContainerChildren[i].replaceWith(buttonElement);
      }
    }
  }


})(jQuery, Drupal);
