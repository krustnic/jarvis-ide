define( [ 
    "backbone", 
    "views/cmd", 
    "views/cmds/open",     
    "views/cmds/sendkeys",     
    "views/cmds/assert",   
    
    "jqueryui" 
], function( 
       
    Backbone, 
    CmdView, 
    CmdOpenView,
    CmdSendkeysView,
    CmdAssertView 
    
    ) {
    
    "use strict";
    
    var CommandsListView = Backbone.View.extend({
        
        el : "#cmds-list",
        
        events : {
            "click"                           : "clickEvent",
            "mouseenter [data-type=command]"  : "enterCommand",
            "mouseleave  [data-type=command]" : "leaveCommand"
        },
        
        initialize : function( options ) {
            var self = this;
            
            this.cmds = options.cmds;            
                        
            this.listenTo( this.cmds, "change reset remove sort", this.render );
            this.listenTo( this.cmds, "remove-model", this.removeModel );
        
            this.render();
        },
        
        // For testing
        clickEvent : function() {
            this.trigger("click:view");
        },
        
        cmdsMap : {
            "open"        : CmdOpenView,
            "sendKeys"    : CmdSendkeysView,
            "assertCount" : CmdAssertView,
            "assertTitle" : CmdAssertView,
            "assertEval"  : CmdAssertView
        },
        
        render : function() {
            
            this.$el.empty();
            
            this.cmds.each( function( cmd ) {
                var CmdClass = this.cmdsMap[ cmd.get("command") ] || CmdView;                
                
                var cmdView = new CmdClass( { model : cmd } );
                this.$el.append( cmdView.render().$el );
                
            }, this );   
            
            this.enableDrag();            
        },
        
        enableDrag : function() {
            var self = this;
            
            this.$el.sortable({
                placeholder: "ui-state-highlight",
                handle: ".dragger",
                stop: function( event, ui ) {				
                    self.reOrderCollection();
                }
            });
            this.$el.disableSelection();
        },
        
        removeModel : function( model ) {            
            
            // When command is removed we should send 'leave' event to parent
            this.leaveCommandById( model.get("id") );
            
            console.log( "Remove", model );
            this.cmds.remove( model );
        },
        
        reOrderCollection : function() {
            var self = this;
            
            var position = 0;
            this.$("[data-model-id]").each(function() {
                var modelId = $(this).attr("data-model-id");
                var model = self.cmds.get( modelId );
                model.set( "position", position );
                
                position += 1;
            });
            
            this.cmds.sort();           
            
        },
        
        enterCommand : function( e ) {
            $(e.currentTarget).parent().addClass("command-hover");
            
            var commandId = $(e.currentTarget).find("[data-model-id]").attr("data-model-id");
            var command = this.cmds.get( commandId );
            
            var cmd = command.toJSON();
            app.ide.send( "enter", cmd );       	
        },
        
        leaveCommand : function( e ) {
            $(e.currentTarget).parent().removeClass("command-hover");
            
            var commandId = $(e.currentTarget).find("[data-model-id]").attr("data-model-id");
            this.leaveCommandById( commandId );
        },
        
        leaveCommandById : function( id ) {            
            var command = this.cmds.get( id );
            
            var cmd = command.toJSON();
            app.ide.send( "leave", cmd );
        }
        
    }); 
    
    return CommandsListView;
});