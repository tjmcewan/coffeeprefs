(function() {
  Backbone.Model.prototype.idAttribute = "_id";
  // Our basic organisation model has just a name and a collection of people
  Organisation = Backbone.Model.extend({
    // Properties: Name, People

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
    model: Person
  });


})();
