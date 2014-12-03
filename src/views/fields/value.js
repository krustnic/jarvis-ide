/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 08:30 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "views/fields/js-editor",
    "text!templates/fields/value.html" 
    
], function( Backbone, _, JsEditorView, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            "click [data-toggle=tab]" : "changeValueType"
        },
        
        initialize : function() {
            this.valueType = this.model.get("valueType");
            this.render();
        },
        
        changeValueType : function( e ) {   
            var self = this;
            this.valueType = this.$(e.target).attr("data-value-type");            
            //this.model.set( "valueType", valueType );                                     
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );            
            
            //this.$("[data-eid=prefix]").val( this.model.get("prefix") );
            //this.$("[data-eid=postfix]").val( this.model.get("postfix") );
            
            this.jsEditorView = new JsEditorView( { model : this.model } );            
            this.$('[data-eid="eval-value-tab"]').append( this.jsEditorView.render().$el );            
            
            return this;
        },
        
        init : function() {
            this.jsEditorView.init();
        },
        
        getValues : function() {
            var value   = this.model.get("value");
            var postfix = this.model.get("postfix");
            var prefix  = this.model.get("prefix");
            
            //if ( this.model.get("valueType") == "eval" ) {
            if ( this.valueType == "eval" ) {
            	value = this.jsEditorView.getValue();
                
                if ( value === false ) return false;
            }
            else {
                value   = this.$("[data-eid=value]").val();
                //postfix = this.$("[data-eid=postfix]").val();
                //prefix  = this.$("[data-eid=prefix]").val();
            }
            
            return {
                value     : value,
                postfix   : postfix,
                prefix    : prefix,
                valueType : this.valueType
            }
        }
        
    });
    
    return view;
});