/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 05:02 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/js-editor", 
    "text!templates/actions/assert-eval.html"

], function( Backbone, _, JsEditorView, tpl ) {
    
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );    
            
            this.jsEditorView = new JsEditorView( { model : this.model } );
            this.$('[data-eid="js-code-field"]').append( this.jsEditorView.render().$el );           
            
            
            return this;
        },
        
        init : function() {
            this.jsEditorView.init();
        },
        
        getValues : function() {
            var jsCode = this.jsEditorView.getValue();            
            
            if ( jsCode === false ) return false;
            
            var self = this;
            var values = {
                "value" : jsCode,
                "name"  : self.$("[data-eid=assert-name]").val()
            }
            
            return values;
        }
        
    });
    
    return view;
});