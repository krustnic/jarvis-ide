/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 05:07 AM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "underscore", "text!templates/actions/empty.html" ], function( Backbone, _, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template() );            
            
            return this;
        },
        
        getValues : function() {
        	return {};
    	}
        
    });
    
    return view;
});