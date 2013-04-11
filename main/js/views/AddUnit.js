var App = App || {};

(function () {

	App.Views.AddUnit = Backbone.View.extend({
		el: '#addUnit',
		tagName: 'addUnit',
		events: {
			'keypress input': 'inputKeypress',
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {
		
			var strUnit = $('#unit').val().trim(); 	
			
			if ( strUnit === "" ) {
				alert ( 'Пожалуйста, введите имя Юнита!' );
				$('#unit').val('');
				$('#unit').focus();
				return false;
			}
			
			this.addItem ( strUnit );
		
		},
		addItem: function( strUnit ) {
			
			var newUnitCollection = new App.Collections.UnitItems([
				{
					unitID: 1,
					material: 'empty',
					count: 0	
				}
			]);
			
			var modelUnit = new App.Models.Unit ({
				
				name: strUnit,
				mcollection: newUnitCollection
				
			});
			
			App.Events.trigger( 'addUnit', modelUnit );
			
			$('.units .unit').each( function () {
				
				$(this).find('.unit_info').toggle();
				
			});
			
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {
			$('#unit').val('');
			$('#unit').focus();
		}
	});

}());