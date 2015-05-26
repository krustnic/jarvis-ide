/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-16
* Time: 09:24 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "text!templates/fields/url.html" 
    
], function( Backbone, _, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        initialize : function() {
            this.render();
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );                   
            
            return this;
        },
        
        init : function() {
            
        },
        
        getValues : function() {
            var value   = this.model.get("value");
            
            value   = this.$("[data-eid=value]").val();                
            
            return {
                value   : value,
                postfix : "",
                prefix  : ""
            }
        }
        
    });
    
    return view;
});