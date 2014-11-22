/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-11-22
* Time: 08:16 AM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "underscore", "views/cmd" ], function( Backbone, _, Cmd ) {
    var view = Cmd.extend({        
        initialize : function() {
            view.__super__.initialize.apply(this, arguments);
            
            this.placeholders["selector"] = "";            
        },
    });
    
    return view;
});