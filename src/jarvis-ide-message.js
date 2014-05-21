/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 07:27 AM
* To change this template use Tools | Templates.
*/
define( ["backbone", "underscore"], function( Backbone, _ ) {
    return function( iframeElId ) {               
        var self = this;
        
        // false for iframe
        this._isParent = true;
        
        this._callbacks = {};
        
        this._getWindow = function() {
            if ( self._isParent ) return document.querySelector("#" + self._iframeElId).contentWindow;
            
            return window.parent;
        }
        
        this.generateId = function() {
            return (new Date()).getTime();
        }
        
        this.sendCallback = function( msgId, data ) {
            var msg = {
                "name" : "callback",
                "data" : data,
                "id"   : msgId
            }            
                        
            self._getWindow().postMessage( msg, "*" );            
        }
        
        this.sendMessage = function( name, data, callback ) {
            var msgId = self.generateId();
            var msg = {
                "name" : name,
                "data" : data,
                "id"   : msgId
            }
            
            if ( callback != undefined ) self._callbacks[ msgId ] = callback;
            
            self._getWindow().postMessage( msg, "*" );            
        }
        
        this.init = function() {
            if ( iframeElId == undefined ) self._isParent = false;
            
            self._iframeElId = iframeElId;
            
            _.extend( self, Backbone.Events );
            
            window.onmessage = function(e) {
                if ( e.data.name == "callback" ) {
                    var msgId = e.data.id;
                    if ( msgId != undefined && self._callbacks[ msgId ] != undefined ) {
                        self._callbacks[ msgId ]( e.data.data );
                        
                        delete self._callbacks[ msgId ];
                    }
                    
                    return;
                }
                
                self.trigger( e.data.name , e.data.data, function( result ) {
                    self.sendCallback( e.data.id, result );
                } );
                
                console.log( "Postman get message: ", e.data );                
            };
        }      
                
        this.init();
        
    };
});