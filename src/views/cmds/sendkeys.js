/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-11-22
* Time: 08:55 AM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "underscore", "views/cmd" ], function( Backbone, _, Cmd ) {
    var view = Cmd.extend({    
        
        keysMap : {
            "13" : "ENTER"            
        },
        
        initialize : function() {
            view.__super__.initialize.apply(this, arguments);
            
            this.placeholders["value"] = this.keysMap[ this.model.get("value") ] || this.model.get("value");
        },
    });
    
    return view;
});