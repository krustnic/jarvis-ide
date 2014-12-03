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
    //"ace/ace",     
    "acorn",
    "text!templates/fields/js-editor.html"
    
    //"ace-js",
	//"ace-chrome"
], function( Backbone, _, acorn, tpl ) {
    var view = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            
        },
        
        initialize : function() {
            console.log("ACE", ace);
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );
                        
            return this;
        },        
        
        
        init : function() {
            this.editor = ace.edit("editor");
            this.editor.setTheme("ace/theme/chrome");
            this.editor.getSession().setMode("ace/mode/javascript");
            this.editor.setValue = this.model.get("value");            
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
        	var value = this.editor.getValue();
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