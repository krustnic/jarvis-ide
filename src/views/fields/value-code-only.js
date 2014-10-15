/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-15
* Time: 10:13 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/js-editor",
    "text!templates/fields/value-code-only.html" 
    
], function( Backbone, _, JsEditorView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            "click [data-toggle=tab]" : "changeValueType"
        },
        
        initialize : function() {
            this.render();
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );                        
            
            this.jsEditorView = new JsEditorView( { model : this.model } );            
            this.$('[data-eid="eval-value-tab"]').append( this.jsEditorView.render().$el );            
            
            return this;
        },
        
        init : function() {
            this.jsEditorView.init();
        },
        
        getValues : function() {
            var value   = value = this.jsEditorView.getValue();
            if ( value === false ) return false;
            
            return {
                value   : value
            }
        }
        
    });
    
    return view;
});