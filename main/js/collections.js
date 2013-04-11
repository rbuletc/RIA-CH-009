var App = App || {};

(function () {

	App.Collections.List = Backbone.Collection.extend({
		model: App.Models.Material,
		initialize: function () {
		
			App.Events.on( 'destroyModel', this.destroyModel, this );
			App.Events.on( 'addModel', this.addModel, this );
			App.Events.on( 'fetchProducts', this.fetchProducts, this );
			App.Events.on( 'writeProducts', this.writeProducts, this );
			
			//App.dbConnector.openDatabase();
			
		},
		fetchProducts: function () {
			
			App.dbConnector.fetchAll();
			
		},
		writeProducts: function ( products ) {
		
			for ( var i=0; i<=products.length-1; i++ )
			{   
			
				var strMaterial = new App.Models.Material({ 
					material: products[i].material, 
					price: products[i].price 
				});
				this.add ( strMaterial );
				
			}
			
		},
		destroyModel: function ( model ) {
		
			App.dbConnector.deleteProduct( model.get('material') );
			model.destroy();
			
		},
		addModel: function ( model ) {
		  
			this.add( model );
			App.dbConnector.addProduct ( model.get("material"), model.get("price") );
			
		}
	});
	
	App.Collections.Units = Backbone.Collection.extend({
	
		model: App.Models.Unit,
		initialize: function () {
			
			App.Events.on( 'addUnit', this.addModel, this );
			App.Events.on( 'unitDelete', this.deleteModel, this );
			App.Events.on( 'fetchUnit', this.fetchUnits, this );
			App.Events.on( 'writeUnits', this.writeCollection, this );
			App.Events.on( 'editUnitName', this.changeName, this );
			App.dbConnector.openDatabase();
		},
		addModel: function ( model ) {

			this.add( model );
			App.dbConnector.AddUnit ( "Units", model );
			 
		},
		fetchUnits: function(){
			
			App.dbConnector.fetchUnit();
		
		},
		writeCollection: function(units){
		
			for(i=0; i<=units.length-1;i++){
			
				var unitCollection = new App.Collections.UnitItems();
				
				unitCollection.add(units[i].mcollection);
				
				var mUnit = new App.Models.Unit({
					name:units[i].name,
					mcollection:unitCollection 
							
				});
			
				this.add(mUnit);
				i++;
			}
		
		},
		deleteModel: function( model ) {
			App.dbConnector.deleteUnit( model.get( "name" ) );
			model.destroy();
			// виклик видалення моделі колекцій із бази

		},
		
		changeName: function ( model, value ) {
			App.dbConnector.changeUnitName( model.get( 'name' ), value );
			model.set({ name: value });
		}
	
	});
	
	App.Collections.UnitItems = Backbone.Collection.extend({
	
		model: App.Models.UnitItem,
		initialize: function () {
			
			App.Events.on( 'addUnitItem', this.addModel, this );
			App.Events.on( 'destroyItemModel', this.destroyModel, this );
			App.Events.on('newMaterialCount', this.editCount, this);
			this.on('add', this.saveUnitCollection, this);
			
		},
		addModel: function ( model ) {
			
			this.add( model );
			
		},
		destroyModel: function ( model ) {
			//App.dbConnector.deleteProduct( model.get('material') );
			model.destroy();
			this.remove(model); 
			//App.dbConnector.AddUnit("Units", model);
			//App.dbConnector.EditUnitItem( model );
		},
		saveUnitCollection: function () {
		
			//App.dbConnector.EditUnitItem ( this.model );
			console.log('App.dbConnector.EditUnitItem triggered!');
		
		},
		editCount: function (model, value) {
			model.set({ count: value });
		}

	});


}()); 