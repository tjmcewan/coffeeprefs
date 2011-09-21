(function() {
  var OrganisationView = Backbone.View.extend({
    tagName   : 'li',

    initialize: function(){
    },
    render : function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    template  : JST['organisations/organisation']
  });

  Creator = Backbone.View.extend({
    el      : $('#organisations'),
    list    : $('#organisation-list'),
    events  : {
      "keypress input":  "createOnEnter",
      "click #organisation-list li .display": 'selectOrganisation'
    },

    initialize : function() {
      _.bindAll(this, 'add','createOnEnter', 'render', 'open', 'selectOrganisation');
    },

    open : function(organisation){
      if (organisation === 'new'){
        // rendering a new org
      }
      this.list.find('.organisation').parent().remove();
      this.render();
    },

    add : function(org) {
      var li = new OrganisationView( {model: org });
      this.list.append(li.render().el);
      return this;
    },

    createOnEnter: function(e) {
      var creator = this;
      var text = $(e.currentTarget).val();
      if (!text || e.keyCode != 13) return;

      var org = CoffeePrefs.Organisations.create({name: text}, 
                                                 {success: function(org) {
                                                    creator.add(org);
                                                   }
                                                 });
      $(e.currentTarget).val('');
    },

    render: function(){
      var creator = this;
      _.each(CoffeePrefs.Organisations.models, function(org){
        creator.add(org);
      });

      return creator;
    },

    selectOrganisation: function(e){
      CoffeePrefs.Router.navigate('organisations/' + $(e.currentTarget).parent('.organisation').attr('id') + '/people', true);
    }
  });

  PeopleCreator = Backbone.View.extend({
    el:     $('#people'),
    list:   $('#people-list'),
    nameContainer: $('#people #organisation-name'),
    events: {
      "keypress input":  "create"
    },

    initialize: function(){
      _.bindAll(this, 'open', 'render', 'add', 'create');
    },

    open: function(organisation){
      this.list.find('.person').parent().remove();
      CoffeePrefs.currentOrganisation = organisation;
      this.render();
    },

    add: function(person){
      var li = new PersonView({model: person });
      this.list.append(li.render().el);
      return this;
    },

    create: function(e){
      var creator = this;
      var text = $(e.currentTarget).val();
      if (!text || e.keyCode != 13) return;

      CoffeePrefs.currentOrganisation.people.create({name: text, 
                                 organisationId: CoffeePrefs.currentOrganisation.id}, {
        success: function(person){
          creator.add(person);
        }
      });

      $(e.currentTarget).val('');
    },

    render: function(){
      var creator = this;
      creator.nameContainer.html(CoffeePrefs.currentOrganisation.get('name'));
      _.each(CoffeePrefs.currentOrganisation.people.models, function(person){
        creator.add(person);
      });

      return creator;
    }
  });

  PersonView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
    },
    render : function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    template  : JST['people/person']

  });
})();
