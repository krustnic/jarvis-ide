/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-15
* Time: 10:24 AM
* To change this template use Tools | Templates.
*/
/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 10:16 AM
* To change this template use Tools | Templates.
*/

define( [ 
    "backbone", 
    "underscore", 
    "views/fields/value-code-only",
    "text!templates/actions/value-only.html" 
    
], function( Backclick, _, ValueCodeView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );    
            
            // Value
            this.valueView = new ValueCodeView({ model : this.model });
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