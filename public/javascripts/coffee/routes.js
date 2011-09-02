(function() {
  Router = Backbone.Router.extend({
    routes : {
      ''            : 'newOrganisation',
      '/'           : 'newOrganisation',
      '/:id/people' : 'listPeople'
    },

    newOrganisation : function() {
      CoffeePrefs.Creator.open('new');
      $('section.current').removeClass('current');
      _.delay(function() { CoffeePrefs.Creator.el.addClass('current'); }, 250);
    },

    listPeople: function(id){
      var organisation = CoffeePrefs.Organisations.get(id);
      CoffeePrefs.PeopleCreator.open(organisation);
      $('section.current').removeClass('current');
      _.delay(function(){ CoffeePrefs.PeopleCreator.el.addClass('current'); }, 250);
    }
   });
})();

