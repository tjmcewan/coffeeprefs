(function() {
  Router = Backbone.Router.extend({
    routes : {
      ''            : 'newOrganisation',
      '/'           : 'newOrganisation'
    },

    newOrganisation : function() {
      CoffeePrefs.Creator.open('new');
      $('section.current').removeClass('current');
      _.delay(function() { CoffeePrefs.Creator.el.addClass('current'); }, 250);
    }
   });
})();

