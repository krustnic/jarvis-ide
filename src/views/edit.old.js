/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-26
* Time: 03:23 PM
* To change this template use Tools | Templates.
*/
define( [ 
    "backbone", 
    "cm/codemirror", 
    "acorn",
    "models/cmd", 
    "text!templates/edit.html", 
    
    "cm/mode/javascript/javascript",
	"cm/addon/edit/matchbrackets",
    "cm/addon/edit/closebrackets",
    "cm/addon/display/fullscreen",
    "bootstrap"
], function( Backbone, CodeMirror, acorn, CmdModel, editTpl ) {
        
    var EditView = Backbone.View.extend({
        el        : "#edit-view",        
        template  : _.template( editTpl ),
        
        model : new CmdModel(),
        
        events : {
            "click [data-type=hide]" : "hide",
            "click [data-eid=add-command]" : "addCommand",
            "click [data-eid=update-command]" : "updateCommand",
            "change [data-eid=actions-list]" : "changeCommand",
            "click [data-toggle=tab]" : "changeValueType"
        },
        
        initialize : function() {                                    
            this.render();                            
        },
        
        render : function() {              
            this.$el.html( this.template({ data : this.model.toJSON() }) );            
            
            this.$("[data-eid=actions-list]").val( this.model.get("action") || this.model.get("command") );
            this.$("[data-eid=prefix]").val( this.model.get("prefix") );
            this.$("[data-eid=postfix]").val( this.model.get("postfix") );
            
            // Always exist. As EvelValue or AssertEval
            var self = this;
            /*
            setTimeout( function() {
                self.initCodemirror( self.model.get("value") );
            }, 250 );            
            */
            
            self.initCodemirror( self.model.get("value") );
        },
        
        changeValueType : function( e ) {            
            var valueType = this.$(e.target).attr("data-value-type");            
            this.model.set( "valueType", valueType );            
            this.render();            
        },
        
        initCodemirror : function( initValue ) {
            this.codeMirror = CodeMirror(function(elt) {                
                this.$("[data-eid=codemirror]")[0].parentNode.replaceChild(elt, this.$("[data-eid=codemirror]")[0]);
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
        
        changeCommand : function( e ) {      
            var action = $(e.currentTarget).val();
            $('[data-eid="raw-action"]').val("");
            
            this.setModel( this.model );
            this.model.set( { "command" : action } );
            this.render();            
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
        
        grub : function() {
            var action   = $('[data-eid="raw-action"]').val() || self.$("[data-eid=actions-list]").val();
            var selector = self.$("[data-eid=selector]").val();
            
            var value    = self.$("[data-eid=value]").val();
            var postfix  = self.$("[data-eid=postfix]").val();
            var prefix  = self.$("[data-eid=prefix]").val();
            if ( action == "assertEval" || this.model.get("valueType") == "eval" ) {
                value = this.codeMirror.getValue();
                
                var error = this.validate( value );
                
                if ( error != null ) {
                    this.$('[data-eid="error"]').text(error);
                    this.$('[data-eid="error"]').show();                    
                    return false;
                }
                else {
                    this.$('[data-eid="error"]').hide();
                }
            }
            
            var name     = self.$("[data-eid=assert-name]").val();
            
            this.model.set("command" , action);
            this.model.set("selector", selector);
            this.model.set("value"   , value);
            this.model.set("prefix" , prefix);
            this.model.set("postfix" , postfix);
            this.model.set("name"    , name);                            
            
            return true;
        },
        
        updateCommand : function() {
            if ( this.grub() ) this.hide();
        },
        
        addCommand : function() {                        
            this.grub();
            
            app.cmds.addAction( this.model.toJSON() );
            this.hide();            
        },
        
        setModel : function( model ) {
            if ( model == undefined ) model = new CmdModel();
            
            this.model = model;
            this.render();
        },        
        
        show : function() {            
            this.$el.show();
            this.render();
        },
        
        hide : function() {
            this.$el.hide();
        },
        
        isVisible : function() {
            return this.$el.is(":visible");
        }
        
    });
    
    return EditView;
});