var App = App || {};

(function () {

	App.Views.Unit = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function () {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy', this.unitRemoveItem, this );

		},
		className: 'unit',
		events: {
			'click .unit_name' : 'unitToggle',
			'click .deleteUnit' : 'unitDeleteItem',
			'click .edit_unitItem' : 'changeUnitName',
			'keypress .edit_unit_name': 'updateOnEnter',
			'blur .edit_unit_name': 'close'
		},
		template: _.template( $('#unit-name').html() ),
		render: function () {	      
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			
			var newUnitItemsList = new App.Views.UnitItemsList( { collection: this.model.get( 'mcollection' ), model: this.model  } ) ;
			this.$('.unit_info').append( newUnitItemsList.el );
			newUnitItemsList.render();
			this.$input = this.$('.edit_unit_name');
			
		}, 
		unitToggle: function () {
			
			var jq_unit_holder = '.unit_holder';
			var jq_unit_info = '.unit_info';
			var jq_visible = ':visible';
			var jq_AddMaterialsList = '.AddMaterialsList';
			
			this.$( jq_unit_info ).toggle();
			
			if ( this.$( jq_unit_info ).is( jq_visible ) === true ) {
			
				$ ( jq_unit_info ).hide();
				this.$( jq_unit_info ).show();
				
				var AddMaterialsList = new App.Views.AddMaterialsList( { collection: App.Materials, model : this.model	} );

				AddMaterialsList.render();
				
				$( jq_AddMaterialsList ).html('');
				$( jq_AddMaterialsList ).append( AddMaterialsList.el );
				
				$(  jq_AddMaterialsList  ).show();	
					var positionTop = this.$( jq_unit_holder ).position().top;
					var positionLeft = this.$( jq_unit_info ).position().left + 530;
				$(  jq_AddMaterialsList  ).css ( { 'top' : positionTop,  'left' : positionLeft } ); 
				
			} else {
			
				$(  jq_AddMaterialsList  ).hide();
			
			}
			
		},
		unitDeleteItem: function() {
		
			if ( confirm('Are you sure you want to delete this Unit?') ) {
				App.Events.trigger( 'unitDelete', this.model );
			}
		
		},
		unitRemoveItem: function() {
		
			this.$el.remove();
			$('.AddMaterialsList').hide();
	
		},
		changeUnitName: function () {
			this.$el.addClass('editing');
			this.$input.focus();
			
		},
		close: function () {
			var value = this.$input.val().trim();
			if ( value =='' ) {
			this.$el.removeClass('editing');
			return;
			};
			if  ( ! value ) {
			this.$el.removeClass('editing');
			return;
			}
			App.Events.trigger('editUnitName', this.model, value);
			this.$el.removeClass('editing');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	});
	
	App.Views.UnitsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		className: 'units',
		initialize: function () {
			this.collection.on('add', this.render, this);
		},
		render: function () {
			
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelUnit ) {
		  
			var UnitView = new App.Views.Unit({ model: modelUnit });
			this.$el.prepend( UnitView.el );
			UnitView.render();
			
			var jq_unit_info = '.unit_info';
			this.$el.find( jq_unit_info ).hide();

		}
	
	});

}());