/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 06:16 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "models/cmd" ], function( Backbone, CmdModel ) {
    var CmdsCollection = Backbone.Collection.extend({
        
        _propertiesShouldBeString : [
            "action", 
            "command",
            "selector",
            "value"
        ],
        
        model : CmdModel,
        
        initialize : function() {
			this.listenTo( this, "reset", this.updatePositions );            
        },
        
        _compareWithActionMask : function( mask, action ) {
            for( var key in mask ) {
                if ( !(key in action) ) return false;
                if ( action[key] != mask[key] ) return false;
            }
            
            return true;
        },
        
        addAction : function( action, isFromParent ) {             
            //Smart action addition
            if ( isFromParent && action["command"] == "change" ) {
                if ( this.length != 0 ) {
                    var lastCmd = this.at( this.length - 1 );
                    
                    var typeActionMask = {
                        "command"      : "type",
                        "selector"     : action["selector"],
                        "value"        : action["value"]                        
                    }
                    
                    if ( this._compareWithActionMask( typeActionMask, lastCmd.toJSON() ) ) {
                        return;
                    }
                    
                    if ( this.length > 1 ) {
                        var lastTwoCmd = this.at( this.length - 2 );
                        
                        var enterActionMask = {
                            "command"      : "sendKeys",                            
                            "value"        : "13"                            
                        }
                        
                        if ( this._compareWithActionMask( enterActionMask, lastCmd.toJSON() ) && this._compareWithActionMask( typeActionMask, lastTwoCmd.toJSON() ) ) {
                            return;
                        }
                    }
                }
            }
            
            //Action propeties should be strings
            for( var key in action ) {
                if ( key in this._propertiesShouldBeString ) {
                    action[key] += "";
                }
            }
            
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
                cmd.set("isSelected", false);
                cmd.set("position"  , position);
                
                position += 1;
            }, this );
        },
                
        setSelected : function( id ) {
            this.each( function( cmd ) {
				cmd.set("isSelected", false);
            }, this );
            
            this.get( id ).set( "isSelected", true );
        },
        
        setSelectedAt : function( index ) {
            if ( index > this.length - 1 ) return;
            
			this.each( function( cmd ) {
				cmd.set("isSelected", false);
            }, this );
            
            this.at( index ).set( "isSelected", true );
        },
        
        getSelected : function() {                       
            var selectedCmd = this.findWhere( { isSelected : true } );
            
            if ( selectedCmd == undefined ) selectedCmd = null;
                        
            if ( selectedCmd == null && this.length > 0 ) {
                selectedCmd = this.at(0);
                this.setSelected( selectedCmd.get("id") );
            }
            
            return selectedCmd;
        },
        
        getSelectedAndSelectNext : function() {
            var selectedCmd = this.getSelected();
            
            if ( selectedCmd != null ) {
                var index = this.indexOf( selectedCmd );
                if ( index != this.length - 1 ) {
                    this.setSelected( this.at( index + 1 ).get("id") );
                }
            }
            
            return selectedCmd;
        }
    });
    
    return CmdsCollection;
});