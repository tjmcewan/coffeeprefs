(function() {
  Backbone.Model.prototype.idAttribute = "_id";
  // Our basic organisation model has just a name and a collection of people
  Organisation = Backbone.Model.extend({
    // Properties: Name, People
    initialize: function(){
      this.people = new People;
      this.people.url = '/organisations/' + this.id + '/people';
      this.people.bind('reset', this.updateCounts);
    }
  });

  Organisations = Backbone.Collection.extend({
    model: Organisation,
    url: "/organisations"
  });


  Person = Backbone.Model.extend({
    // Properties: Name, Preference, WantsDrink
  });

  People = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Person,
    url: '/people',

    forOrganisation: function(organisation){
      return _(this.models.filter(function(p) { return _.include(organisation.id, p.organisationId); }));
    }
  });


})();
