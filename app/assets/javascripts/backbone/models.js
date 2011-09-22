(function() {
  Backbone.Model.prototype.idAttribute = "_id";
  // Our basic organisation model has just a name and a collection of people
  Organisation = Backbone.Model.extend({
    // Properties: Name, People
    initialize: function(){
      this.people = new People;
      this.people.url = '/organisations/' + this.id + '/people';
      //this.people.bind('reset', this.updateCounts);
    }
  });

  Organisations = Backbone.Collection.extend({
    model: Organisation,
    url: "/organisations"
  });


  Person = Backbone.Model.extend({
    // Properties: Name, Preference, WantsDrink

    signIn : function(name) {
      var self = this;
      $.ajax({
        url       : '/sign-in',
        type      : 'post',
        data      : { name: name },
        dataType  : 'json',
        success   : function(attributes) {
          self.set(attributes);
          self.trigger('signin:success');
        }
      });
    },

    signOut : function() {
      var self = this;
      $.ajax({
        url       : '/sign-out',
        type      : 'get',
        dataType  : 'json',
        success   : function() {
          self.set({ id: undefined, name: undefined });
          self.trigger('signout:success');
        }
      });
    }
  });

  People = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Person,
    url: '/people'

  });
})();
