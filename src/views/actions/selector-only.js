/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 10:02 AM
*/

define( [ 
    "backbone", 
    "underscore", 
    "views/fields/selector",
    "text!templates/actions/selector-only.html" 
    
], function( Backclick, _, SelectorView, tpl ) {
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
            
            return this;
        },
        
        init : function() {
            
        },
        
        getValues : function() {
            //var values = {};            
            //var selector = this.selectorView.getValue();            
            //values["selector"] = selector;
            
            var values = this.selectorView.getValues();
            
        	return values;
    	}
        
    });
    
    return view;
});