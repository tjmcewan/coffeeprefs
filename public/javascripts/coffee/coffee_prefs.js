$(function(){

  // Todo Item View
  // --------------

  // The DOM element for an organisation
  window.OrganisationView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: JST["organisations/organisation"],

    // The DOM events specific to an item.
    // events: {
    //   "click .check"              : "toggleDone",
    //   "dblclick div.todo-text"    : "edit",
    //   "click span.todo-destroy"   : "clear",
    //   "keypress .todo-input"      : "updateOnEnter"
    // },

    // The TodoView listens for changes to its model, re-rendering.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },

    // To avoid XSS (not that it would be harmful in this particular app),
    // we use `jQuery.text` to set the contents of the todo item.
    setText: function() {
      var text = this.model.get('text');
      this.$('.todo-text').text(text);
      this.input = this.$('.todo-input');
      this.input.bind('blur', _.bind(this.close, this)).val(text);
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({text: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#coffeeprefs"),

  //   Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-organisation":  "createOnEnter",
      "keyup #new-organisation":     "showTooltip"
    },

  //   At initialization we bind to the relevant events on the `Todos`
  //   collection, when items are added or changed. Kick things off by
  //   loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.input    = this.$("#new-organisation");

      Organisations.bind('add',   this.addOne, this);

      //Organisations.fetch();
    },

  //   Add a single todo item to the list by creating a view for it, and
  //   appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new OrganisationView({model: todo});
      this.$("#organisation-list").append(view.render().el);
    },

  //   If you hit return in the main input field, and there is text to save,
  //   create new **Todo** model persisting it to *localStorage*.
    createOnEnter: function(e) {
      var text = this.input.val();
      if (!text || e.keyCode != 13) return;
      Organisation.create({text: text});
      this.input.val('');
    },

  //   Lazily show the tooltip that tells you to press `enter` to save
  //   a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});

