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
            this.listenTo( Backbone, "set-selector", this.setSelector );
            
            this.isInspectorEnabled = false;
            this.render();
        },
        
        render : function() {        
            this.$el.html( this.template( { data : this.model.toJSON() } ) );            
            
            return this;
        },        
        
        setSelector : function( msg ) {
            // To prevent memory leak
            if ( !this.$el.is(":visible") ) {
                this.stopListening();
                return;
            }
            
            this.model.set("selector"  , msg["selector"]);
            this.model.set("iframeinfo", msg["iframeinfo"])
            
            console.log("From selector: ", msg);
            
            this._stop();
        },
        
        _start : function() {
            this.$('[data-eid="find-selector"]').addClass("find-selector-process");
            
            app.ide.send( "find-selector-start", {} );            
            this.isInspectorEnabled = true;
            console.log("findSelector: start");
        },
        
        _stop  : function() {
            this.$('[data-eid="find-selector"]').removeClass("find-selector-process");
            
            app.ide.send( "find-selector-stop", {} );            
            this.isInspectorEnabled = false;
            console.log("findSelector: stop");
        },
        
        findSelector : function() {
            if ( !this.isInspectorEnabled ) {
                this._start();
            }
            else {
                this._stop();
            }
        },
        
        getValue : function() {
            return this.$("[data-eid=selector]").val();
        }
        
    });
    
    return SelectorView;
});