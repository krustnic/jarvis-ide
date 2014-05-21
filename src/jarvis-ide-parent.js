/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 07:04 AM
* To change this template use Tools | Templates.
*/
define( ["jarvis-ide-message"], function( PostMan ) {
    return function() {
        var self = this;
                
        this.init = function( iframeElId ) {
            iframeElId = iframeElId || "jarvis-ide";            
                       
            self.postman = new PostMan( iframeElId );
            
            console.log("Postman: ", self.postman);  
        }
        
        // Proxy to postman event queue
        this.on = function() {
            self.postman.on.apply( self.postman, arguments );
        }
        
        this.trigger = function() {
            self.postman.trigger.apply( self.postman, arguments );
        }
        
        this.uploadTest = function( testJson, callback ) {
            self.postman.sendMessage( "upload", testJson, callback );   
        }
        
        this.clearTest = function( callback ) {
            self.postman.sendMessage( "clear", {}, callback );   
        }
        
        this.getTest = function( callback ) {
            self.postman.sendMessage( "get", {}, callback );   
        }
        
        this.init();
    };
});