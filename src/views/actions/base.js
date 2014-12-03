/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-16
* Time: 03:53 PM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/selector",
    "views/fields/value",
    "text!templates/actions/base.html" 
    
], function( Backbone, _, SelectorView, ValueView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );    
            
            // Selector
            this.selectorView = new SelectorView({ model : this.model });
            this.$el.append( this.selectorView.render().$el );
            
            // Value
            this.valueView = new ValueView({ model : this.model });
            this.$el.append( this.valueView.render().$el );            
            
            return this;
        },
        
        init : function() {
            this.valueView.init();
        },
        
        getValues : function() {
            //var selector = this.selectorView.getValue();
            var values    = this.valueView.getValues();
            
            if ( values === false ) return false;
            
            //values["selector"] = selector;
            _.extend( values, this.selectorView.getValues() );
            
        	return values;
    	}
        
    });
    
    return view;
});