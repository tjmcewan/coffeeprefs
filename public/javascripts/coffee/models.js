(function() {
  window.Organisation = Backbone.Model.extend({
    url: '/organisations',
    toJSON: function() {
      return {organisation: this.attributes};
    }
  });
})(jQuery);
