define( [ "backbone", "views/cmd" ], function( Backbone, CmdView ) {
    var CommandsListView = Backbone.View.extend({
        
        el : "#cmds-list",
        
        initialize : function( cmdsCollection ) {
            this.cmds = cmdsCollection;
            this.listenTo( this.cmds, "change reset", this.render );
        
            this.render();
        },
        
        render : function() {
            this.$el.empty();
            
            this.cmds.each( function( cmd ) {
                var cmdView = new CmdView( { model : cmd } );
                this.$el.append( cmdView.render().$el );
            }, this );            
        }
        
    }); 
    
    return CommandsListView;
});