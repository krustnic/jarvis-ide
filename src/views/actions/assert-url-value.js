define( [ 
    "backbone", 
    "underscore", 
    "views/fields/assert-name",
    "views/fields/url",
    "views/fields/value-plain",
    "text!templates/actions/base.html" 
    
], function( Backbone, _, AssertNameView, UrlView, ValueView, tpl ) {
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
            this.urlView = new UrlView({ model : this.model });
            this.$el.append( this.urlView.render().$el );
            
            // Value
            this.valueView = new ValueView({ model : this.model });
            this.$el.append( this.valueView.render().$el );            
            
            return this;
        },
        
        init : function() {
            
        },
        
        getValues : function() {
            var name     = this.assertNameView.getValue();
            //var selector = this.selectorView.getValue();
            var values   = this.valueView.getValues();
            
            if ( values === false ) return false;
            
            //values["selector"] = selector;
            _.extend( values, this.urlView.getValues() );
            values["name"]     = name;
            
        	return values;
    	}
        
    });
    
    return view;
});