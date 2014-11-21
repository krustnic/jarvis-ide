/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-11-20
* Time: 05:10 PM
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
    "views/fields/assert-name",
    "views/fields/value",
    "text!templates/actions/assert-title.html" 
    
], function( Backclick, _, AssertNameView, ValueView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            
            this.$el.html( this.template( { data : this.model.toJSON() } ) );    
            
            // Name
            this.assertNameView = new AssertNameView({ model : this.model });
            this.$el.append( this.assertNameView.render().$el );          
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
            
            values["name"] = this.assertNameView.getValue();
            
        	return values;
    	}
        
    });
    
    return view;
});