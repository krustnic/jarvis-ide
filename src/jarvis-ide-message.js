/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 07:27 AM
* To change this template use Tools | Templates.
*/
define(function() {
    return function( iframeElId ) {               
        var self = this;
        
        this._isParent = true;
        
        this._getWindow = function() {
            if ( self._isParent ) return document.querySelector("#" + self._iframeElId).contentWindow;
            
            return window.parent;
        }
        
        this.sendMessage = function( name, data ) {
            var msg = {
                "name" : name,
                "data" : data
            }
            
            self._getWindow().postMessage( msg, "*" );            
        }
        
        this.init = function() {
            if ( iframeElId == undefined ) self._isParent = false;
            
            self._iframeElId = iframeElId;
        }      
                
        this.init();
        
    };
});