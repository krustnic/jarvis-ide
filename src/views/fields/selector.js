/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 04:34 AM
* To change this template use Tools | Templates.
*/

define( [ "backbone", "underscore", "text!templates/fields/selector.html" ], function( Backbone, _, tpl ) {
    var SelectorView = Backbone.View.extend({   
        
        template : _.template( tpl ),
        
        events : {                        
            'click [data-eid="find-selector"]' : 'findSelector'
        },
        
        initialize : function() {
            this.isInspectorEnabled = false;
            this.render();
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );            
            
            return this;
        },
        
        findSelector : function() {
            if ( !this.isInspectorEnabled ) {
                app.ide.send( "find-selector-start", {} );            
                this.isInspectorEnabled = true;
                console.log("findSelector: start");
            }
            else {
                app.ide.send( "find-selector-stop", {} );            
                this.isInspectorEnabled = false;
                console.log("findSelector: stop");
            }
        },
        
        getValue : function() {
            return this.$("[data-eid=selector]").val();
        }
        
    });
    
    return SelectorView;
});