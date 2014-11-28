/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-11-28
* Time: 09:07 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/assert-name",
    "views/fields/selector",    
    "text!templates/actions/base.html" 
    
], function( Backbone, _, AssertNameView, SelectorView, tpl ) {
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
           
            return this;
        },
        
        init : function() {
            
        },
        
        getValues : function() {
            var name     = this.assertNameView.getValue();
            var selector = this.selectorView.getValue();
                        
            values["selector"] = selector;
            values["name"]     = name;
            
        	return values;
    	}
        
    });
    
    return view;
});