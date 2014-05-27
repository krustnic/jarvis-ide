/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-26
* Time: 03:23 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "text!templates/edit.html" ], function( Backbone, editTpl ) {
    var EditView = Backbone.View.extend({
        el        : "#edit-view",        
        template  : _.template( editTpl ),
        
        events : {
            "click [data-type=hide]" : "hide"
        },
        
        initialize : function() {
            this.render();            
        },
        
        render : function() {
            this.$el.html( this.template() );
        },
        
        show : function() {
            this.$el.show();
        },
        
        hide : function() {
            this.$el.hide();
        }
        
    });
    
    return EditView;
});