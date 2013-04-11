var App = App || {};

(function () {
	
	App.Materials = new App.Collections.List;   
	App.Units = new App.Collections.Units;
	App.Views.Show = new App.Views.ControlView ( { el: $( '#content' ) } );
	App.UnitCollection = new Array(); 

}()); 