/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 06:01 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "underscore", "text!templates/cmd.html" ], function( Backbone, _, cmdTpl ) {
    var CmdView = Backbone.View.extend({
        tagName   : "li",
        className : "ui-state-default",
        template  : _.template( cmdTpl ),        
        
        events : {                        
            "click .command-body"   : "select",
            "click [data-type=remove]" : "remove",            
            "click [data-type=play]"   : "play"
        },
        
        initialize : function() {
            //this.listenTo( this.model, "change", this.render );
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );
            
            // Set selection
            if ( this.model.get("isSelected") ) {
                this.$el.addClass("command-selected");
            }
            
            return this;
        },
        
        play : function() {
            app.ide.send( "play", this.model.toJSON() );
            return false;
        },
        
        remove : function() {            
            this.model.trigger( "remove-model", this.model );
            return false;            
        },
        
        showEdit : function() {   
            app.cmdList.$el.hide();
            
            app.editView.setModel( this.model );
            app.editView.show();
        },
        
        select : function() {         
            // If cmd already selected - go to editing mode
            if ( this.model.get("isSelected") ) {
                this.showEdit();
            }
            else {
            	app.cmds.setSelected( this.model.get("id") );                
            }            
        }
        
    });
    
    return CmdView;
});