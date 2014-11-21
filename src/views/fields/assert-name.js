/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 04:34 AM
* To change this template use Tools | Templates.
*/

define( [ "backbone", "underscore", "text!templates/fields/assert-name.html" ], function( Backbone, _, tpl ) {
    var SelectorView = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            this.render();
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );            
            
            return this;
        },
        
        getValue : function() {
            return this.$("[data-eid=assert-name]").val();
        }
        
    });
    
    return SelectorView;
});