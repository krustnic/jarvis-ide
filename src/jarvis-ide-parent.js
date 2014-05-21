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
            
            window.onmessage = function(e) {
                console.log( "Parent get message: ", e.data );
                /*
                if (e.data == 'hello') {
                    alert('It works!');
                }
                */
            };
        }             
        
        this.loadTest = function( testJson ) {
            self.postman.sendMessage( "load", testJson );   
        }
        
        this.test = function() {
            //alert("Parent: it is a live!");
        }
        
        this.init();
    };
});