/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 07:14 AM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "underscore", 
    "cm/codemirror",     
    "acorn",
    "text!templates/fields/js-editor.html",
    
    "cm/mode/javascript/javascript",
	"cm/addon/edit/matchbrackets",
    "cm/addon/edit/closebrackets",
    "cm/addon/display/fullscreen"
], function( Backbone, _, CodeMirror, acorn, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );
                        
            return this;
        },
        
        init : function() {
            this.initCodemirror( this.model.get("value") );
        },
        
        initCodemirror : function( initValue ) {
            if ( initValue == undefined ) initValue = "";
            
            var self = this;
            
            this.codeMirror = CodeMirror(function(elt) {                
                self.$el.find("[data-eid=codemirror]")[0].parentNode.replaceChild(elt, self.$el.find("[data-eid=codemirror]")[0]);
            }, {
                value: initValue,
                lineNumbers: true,                        
                matchBrackets: true,
                autoCloseBrackets: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete",
                    "F11"       : function(cm) {
                      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                    },
                    "Esc"       : function(cm) {
                      if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                    }
                }                
            });
            
            if ( initValue != "" ) this.codeMirror.setValue( initValue );
        },
        
        validate : function( codeText ) {
            var error = null;

            try {
                var tree = acorn.parse( codeText, {
                    "forbidReserved" : true,
                    "allowReturnOutsideFunction" : true
                } );
            }
            catch (e) {
                error = e.message;
            }
            
            return error;
        },
        
        getValue : function() {
        	var value = this.codeMirror.getValue();
        	var error = this.validate( value );
                
            if ( error != null ) {
                this.$('[data-eid="error"]').text(error);
                this.$('[data-eid="error"]').show();                    
                return false;
            }
            else {
                this.$('[data-eid="error"]').hide();
            }
        
            return value;
        }
        
    });
    
    return view;
});