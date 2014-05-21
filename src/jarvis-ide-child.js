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
            
            window.onmessage = function(e) {
                console.log( "Child get message: ", e.data );
                /*
                if (e.data == 'hello') {
                    alert('It works!');
                }
                */
            };
            
            self.test();
        }
        
        this.test = function() {
            self.postman.sendMessage("test", {});
        }
        
        this.init();
    };
});