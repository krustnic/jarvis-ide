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
    "cm/addon/display/fullscreen"
], function( Backbone, CodeMirror, acorn, CmdModel, editTpl ) {
        
    var EditView = Backbone.View.extend({
        el        : "#edit-view",        
        template  : _.template( editTpl ),
        
        model : new CmdModel(),
        
        events : {
            "click [data-type=hide]" : "hide",
            "click [data-eid=add-command]" : "addCommand",
            "click [data-eid=update-command]" : "updateCommand",
            "change [data-eid=actions-list]" : "changeCommand"
        },
        
        initialize : function() {            
            this.render();                            
        },
        
        render : function() {            
            this.$el.html( this.template({ data : this.model.toJSON() }) );            
            
            this.$("[data-eid=actions-list]").val( this.model.get("action") || this.model.get("command") );
            
            if ( this.model.get("command") == "assertEval" ) {
                this.initCodemirror( this.model.get("value") );
            }
        },
        
        initCodemirror : function( initValue ) {
            this.codeMirror = CodeMirror(function(elt) {
                this.$("[data-eid=codemirror]")[0].parentNode.replaceChild(elt, this.$("[data-eid=codemirror]")[0]);
            }, {
                value: "return true",
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
            this.model.set( { "command" : $(e.currentTarget).val() } );
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
        
        updateCommand : function() {
            var action   = self.$("[data-eid=actions-list]").val();
            var selector = self.$("[data-eid=selector]").val();
            
            var value    = self.$("[data-eid=value]").val();
            if ( action == "assertEval" ) {
                value = this.codeMirror.getValue();
                
                var error = this.validate( value );
                
                if ( error != null ) {
                    this.$('[data-eid="error"]').text(error);
                    this.$('[data-eid="error"]').show();                    
                    return;
                }
                else {
                    this.$('[data-eid="error"]').hide();
                }
            }
            
            var name     = self.$("[data-eid=assert-name]").val();
            
            this.model.set("command" , action);
            this.model.set("selector", selector);
            this.model.set("value"   , value);
            this.model.set("name"    , name);      
            
            this.hide();
        },
        
        addCommand : function() {                        
            this.grub();
            this.model.set( "id", app.cmds.length );
            
            app.cmds.add( this.model );
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
        }
        
    });
    
    return EditView;
});