(function() {
  var OrganisationView = Backbone.View.extend({
    tagName   : 'li',

    initialize: function(){
      return this.render();
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
      "keypress input":  "createOnEnter"
    },

    initialize : function() {
      _.bindAll(this, 'add','createOnEnter', 'render');
    },

    add : function(org) {
      var li = new OrganisationView({ model: org });
      this.list.append(li.render().el);
      return this;
    },

    createOnEnter: function(e) {
      var creator = this;
      var text = $(e.currentTarget).val();
      if (!text || e.keyCode != 13) return;

      var org = CoffeePrefs.Organisations.create({name: text});
      creator.add(org);
      $(e.currentTarget).val('');
    },

    render: function(){
      var creator = this;
      CoffeePrefs.Organisations.each(function(org){
        creator.add(org);
      });

      return creator;
    }

  });
})();

