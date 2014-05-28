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
            "click [data-type=remove]" : "remove",
            "click .command-body"      : "showEdit"
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );
            return this;
        },
        
        remove : function() {            
            this.model.trigger( "remove-model", this.model );
            return false;            
        },
        
        showEdit : function() {
            app.editView.setModel( this.model );
            app.editView.show();
        }
        
    });
    
    return CmdView;
});