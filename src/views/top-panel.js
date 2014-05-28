/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-27
* Time: 05:54 AM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "text!templates/top-panel.html" ], function( Backbone, topPanelTpl ) {
    var TopPanelView = Backbone.View.extend({
        el : "#top-panel",
        
        template : _.template( topPanelTpl ),
        
        events : {
            "click [data-eid=add-command]" : "addCommand"            
        },
        
        initialize : function() {
            this.render();
        },
        
        render : function() {
            this.$el.html( this.template() );    
        },
        
        addCommand : function() {
            app.editView.setModel();
            app.editView.show();
        }
        
    });
    
    return TopPanelView;
});