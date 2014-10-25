/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-25
* Time: 04:22 PM
* To change this template use Tools | Templates.
*/

define( [ 
    "backbone", 
    "underscore", 
    "views/fields/value-plain",
    "text!templates/actions/value-plain.html" 
    
], function( Backclick, _, ValueView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );    
            
            // Value
            this.valueView = new ValueView({ model : this.model });
            this.$el.append( this.valueView.render().$el );          
            
            return this;
        },
        
        init : function() {
            this.valueView.init();
        },
        
        getValues : function() {
            var values    = this.valueView.getValues();
            
            if ( values === false ) return false;            
            
        	return values;
    	}
        
    });
    
    return view;
});