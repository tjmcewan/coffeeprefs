(function() {
	var Organisation = Backbone.Model.extend({
		url: '/organisations',
		localStorage : new Store('organistion')
	});
});