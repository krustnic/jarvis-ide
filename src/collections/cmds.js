/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 06:16 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "models/cmd" ], function( Backbone, CmdModel ) {
    var CmdsCollection = Backbone.Collection.extend({
        model : CmdModel,
        
        initialize : function() {
			this.listenTo( this, "reset", this.updatePositions );            
        },
        
        addAction : function( action ) {
            
            // Special case with "type" action realtime update
            if ( this.length != 0 ) {
                var lastCmd = this.at( this.length - 1 );
                if ( lastCmd.get("command") == "type" && action["command"] == "type" ) {
                    if ( lastCmd.get("selector") == action["selector"] ) {
                        lastCmd.set( "value", action["value"] );
                        return;
                    }
                }
            }            
            
            // Else add new action
            action["id"] = (new Date()).getTime() + this.length;
            
            // Set last position index
            action["position"] = this.length;
            
            this.add( action );
        },
        
        // For sorting by postion
        comparator: function( a, b ) {            
            a = parseInt( a.get( "position" ) );
            b = parseInt( b.get( "position" ) );
            
            return a > b ?  1
                 : a < b ? -1
                 :          0;
        },
        
        updatePositions : function() {
            var position = 0;
            this.each( function( cmd ) {
                cmd.set("position", position);
                
                position += 1;
            }, this );
        }
    });
    
    return CmdsCollection;
});