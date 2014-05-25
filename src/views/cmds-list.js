define( [ "backbone", "views/cmd", "jqueryui" ], function( Backbone, CmdView ) {
    var CommandsListView = Backbone.View.extend({
        
        el : "#cmds-list",
        
        initialize : function( cmdsCollection ) {
            this.cmds = cmdsCollection;
            this.listenTo( this.cmds, "change reset remove sort", this.render );
            this.listenTo( this.cmds, "remove-model", this.removeModel );
        
            this.render();
        },
        
        render : function() {
            this.$el.empty();
            
            this.cmds.each( function( cmd ) {
                var cmdView = new CmdView( { model : cmd } );
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
            
            console.log("Sort: ", this.cmds);
        }
        
    }); 
    
    return CommandsListView;
});