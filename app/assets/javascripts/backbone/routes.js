(function() {
  Router = Backbone.Router.extend({
    routes : {
      ''            : 'newOrganisation',
      '/'           : 'newOrganisation',
      'organisations/:id/people' : 'listPeople',
      'sign-in'     : 'signIn'
    },

    newOrganisation : function() {
      CoffeePrefs.Creator.open('new');
      $('section.current').removeClass('current');
      _.delay(function() { CoffeePrefs.Creator.el.addClass('current'); }, 250);
    },

    listPeople: function(id){
      var organisation = CoffeePrefs.Organisations.get(id);
      organisation.people.fetch({
        success: function(){
          CoffeePrefs.PeopleCreator.open(organisation);
          $('section.current').removeClass('current');
          _.delay(function(){ CoffeePrefs.PeopleCreator.el.addClass('current'); }, 250);
        }
     });
    },

    signIn: function(){
      $('section.current').removeClass('current');
      _.delay(function() { CoffeePrefs.AccountManager.el.addClass('current'); }, 250);
    }
   });
})();
