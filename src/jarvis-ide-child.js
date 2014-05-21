/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 07:05 AM
* To change this template use Tools | Templates.
*/
define( ["jarvis-ide-message"], function( PostMan ) {
    return function() {
        var self = this;
                
        this.init = function() {                       
            self.postman = new PostMan();            
        }
        
        // Proxy to postman event queue
        this.on = function() {
            self.postman.on.apply( self.postman, arguments );
        }
        
        this.trigger = function() {
            self.postman.trigger.apply( self.postman, arguments );
        }
        
        this.ready = function() {
            self.postman.sendMessage("ready", {});
        }
        
        this.init();
    };
});