var App = App || {};

(function () {

	App.Models.Material = Backbone.Model.extend({ 

		material: 'empty',
		price: 0
	
	});
	
	App.Models.UnitItem = Backbone.Model.extend({
	
		unitID: 1,
		material: '',
		count: 0
	
	});
	
	App.Models.Unit = Backbone.Model.extend({
	
		name: 'unit',
		mcollection: ''
	
	});
	


}()); 