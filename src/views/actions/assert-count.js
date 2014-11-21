/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-16
* Time: 09:23 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/assert-name",
    "views/fields/selector",
    "views/fields/value-plain",
    "text!templates/actions/base.html" 
    
], function( Backbone, _, AssertNameView, SelectorView, ValueView, tpl ) {
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
            
            // Selector
            this.selectorView = new SelectorView({ model : this.model });
            this.$el.append( this.selectorView.render().$el );
            
            // Value
            this.valueView = new ValueView({ model : this.model });
            this.$el.append( this.valueView.render().$el );            
            
            return this;
        },
        
        init : function() {
            
        },
        
        getValues : function() {
            var name     = this.assertNameView.getValue();
            var selector = this.selectorView.getValue();
            var values   = this.valueView.getValues();
            
            if ( values === false ) return false;
            
            values["selector"] = selector;
            values["name"]     = name;
            
        	return values;
    	}
        
    });
    
    return view;
});