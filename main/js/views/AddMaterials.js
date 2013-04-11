var App = App || {};

(function () {	

	App.Views.AddMaterialsList = Backbone.View.extend({
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
			this.model.on('change', this.saveUnitCollection, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelMaterial) {
			var MaterialsCollection = this.model.get ( 'mcollection' );
			var MaterialView = new App.Views.MaterialPlus({ model: modelMaterial, collection: MaterialsCollection, something: this.model });
			//console.log( this.model );
			MaterialView.render();
			this.$el.append( MaterialView.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
			console.log('App.dbConnector.EditUnitItem triggered!');
		
		}
	
	});
	
	App.Views.MaterialPlus = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			//this.model.on('change:price', this.render, this);
			this.collection.on('add', this.saveUnitCollection, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'click .plus' : 'confirmQuantity'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity of ' + this.model.get ( 'material' )  );
			if ( ( quantity !== '' ) && ( quantity !== null ) ) {
				this.model.set ( { count: quantity } )
				this.collection.add ( this.model );
				//App.dbConnector.EditUnitItem (  );
				this.options.something.set("mcollection", this.collection);
				console.log ( this.options.something ); 
				
				//вызываем event
				
			}	
		},
		saveUnitCollection: function () {
			

			App.dbConnector.EditUnitItem (this.options.something);
			console.log('App.dbConnector.EditUnitItem triggered!');
		},
		
		
		plus: function () {
		
		
		
		}
	});
	
}());