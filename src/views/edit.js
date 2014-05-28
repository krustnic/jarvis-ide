/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-26
* Time: 03:23 PM
* To change this template use Tools | Templates.
*/
define( [ "backbone", "models/cmd", "text!templates/edit.html" ], function( Backbone, CmdModel, editTpl ) {
    var EditView = Backbone.View.extend({
        el        : "#edit-view",        
        template  : _.template( editTpl ),
        
        model : new CmdModel(),
        
        events : {
            "click [data-type=hide]" : "hide",
            "click [data-eid=add-command]" : "addCommand",
            "click [data-eid=update-command]" : "updateCommand"
        },
        
        initialize : function() {
            this.render();                  
        },
        
        render : function() {
            console.log("Edit model: ", this.model );
            this.$el.html( this.template({ data : this.model.toJSON() }) );
            
            this.$("[data-eid=actions-list]").val( this.model.get("action") || this.model.get("command") );
        },
        
        grub : function() {
            var action   = self.$("[data-eid=actions-list]").val();
            var selector = self.$("[data-eid=selector]").val();
            var value    = self.$("[data-eid=value]").val();
            
            this.model.set("command" , action);
            this.model.set("selector", selector);
            this.model.set("value"   , value);
        },
        
        updateCommand : function() {
            this.grub();            
            
            this.hide();
        },
        
        addCommand : function() {                        
            this.grub();
            this.model.set( "id", app.cmds.length );
            
            app.cmds.add( this.model );
            this.hide();
            
            console.log("Collection: ", app.cmds);
        },
        
        setModel : function( model ) {
            if ( model == undefined ) model = new CmdModel();
            
            this.model = model;
            this.render();
        },
        
        show : function() {            
            this.$el.show();
        },
        
        hide : function() {
            this.$el.hide();
        }
        
    });
    
    return EditView;
});