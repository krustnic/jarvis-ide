/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 06:01 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "underscore", "text!templates/cmd.html" ], function( Backbone, _, cmdTpl ) {
    var CmdView = Backbone.View.extend({
        template : _.template( cmdTpl ),
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );
            return this;
        }
    });
    
    return CmdView;
});