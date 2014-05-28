/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 06:18 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone" ], function( Backbone ) {
    var CmdModel = Backbone.Model.extend({
        defaults : {
            "action"   : "",
            "selector" : "",
            "value"    : "",
            "position" : 0
        }        
         
    });
    
    return CmdModel;
});