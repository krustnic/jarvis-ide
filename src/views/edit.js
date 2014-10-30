/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-07-18
* Time: 04:41 AM
* To change this template use Tools | Templates.
*/

define( [ 
    "backbone", 
    "underscore",
    "views/actions/empty",
    "views/actions/base",
    "views/actions/selector-only",
    "views/actions/selector-plain-value",
    "views/actions/value-only",
    "views/actions/value-plain",
    "views/actions/value-code-only",    
    "views/actions/assert-eval",
    "models/cmd", 
    "text!templates/edit.html",     
    
    "bootstrap"
], function( 
    Backbone, 
    _, 
    EmptyAction, 
    BaseAction, 
    SelectorOnlyAction, 
    SelectorPlainValueAction, 
    ValueOnlyAction, 
    ValuePlainAction, 
    ValueCodeOnlyAction, 
    AssertEvalAction, 
    CmdModel, 
    editTpl 
    
    ) {
    
    "use strict";
    
    var EditView = Backbone.View.extend({
        el        : "#edit-view",        
        template  : _.template( editTpl ),
        
        model : new CmdModel(),
        
        events : {
            "click"                           : "clickEvent",
            "click [data-type=hide]"          : "hide",
            "click [data-eid=add-command]"    : "addCommand",
            "click [data-eid=update-command]" : "updateCommand",
            "change [data-eid=actions-list]"  : "changeCommand"            
        },
        
        initialize : function() {    
            this.listenTo( this.model, "change", this.render );
            this.render();                            
        },
        
        // For testing
        clickEvent : function() {
            this.trigger("click:view");
        },
        
        actionsMap : {
            "click"		      : SelectorOnlyAction,
            "dblclick"        : SelectorOnlyAction,
            "mouseup"         : SelectorOnlyAction,
            "mousedown"       : SelectorOnlyAction,
            "screenshot"      : SelectorOnlyAction,
            "open"            : ValueOnlyAction,
            "sendKeys"        : ValueOnlyAction,
            "wait"            : ValuePlainAction,
            "waitFor"         : ValueCodeOnlyAction,
            "waitForSelector" : SelectorOnlyAction,
            "reload"          : ValuePlainAction,
            "assertTitle"     : ValueOnlyAction,
            "assertEval"      : AssertEvalAction,
            "assertCount"     : SelectorPlainValueAction
        },
        
        getViewByName : function( name ) {
            if ( name == undefined ) return EmptyAction;
            if ( name in this.actionsMap ) return this.actionsMap[ name ];
            
            return BaseAction;
        },
        
        render : function() {              
            this.$el.html( this.template({ data : this.model.toJSON() }) );   
            this.$("[data-eid=actions-list]").val( this.model.get("action") || this.model.get("command") );
    
            var actionName = this.model.get("command");
            
            
            this.view = new (this.getViewByName( actionName ))({ model : this.model });                
    		this.$("[data-eid=action-properties]").append( this.view.render().$el );         
            
            // For additional initialization of inherit views (e. g. CodeMirror bug )
            if ( this.view.init != undefined ) this.view.init();            
        },
        
        changeCommand : function( e ) {      
            var action = $(e.currentTarget).val();
            $('[data-eid="raw-action"]').val("");
            
            //this.setModel( this.model );
            this.model.set( { "command" : action } );
            this.render();            
        },  
        
        grub : function() {
            var values = this.view.getValues();
            
            // If there is some errors in actions/fields then break
            if ( values === false ) return false;
            
            values["command"] = $('[data-eid="raw-action"]').val() || self.$("[data-eid=actions-list]").val();            
            this.model.set( values );
            
            return true;           
        },
        
        updateCommand : function() {
            if ( this.grub() ) {
                this.originModel.set( this.model.toJSON() );
            	this.hide();  
            } 
        },
        
        addCommand : function() {                        
            if ( this.grub() ) {
				app.cmds.addAction( this.model.toJSON() );
            	this.hide();                            
            }            
        },
        
        setModel : function( model ) {
            if ( model == undefined ) {
                model = new CmdModel();
            }
            else {
                this.originModel = model;
            }
            
            if ( this.model != undefined ) this.stopListening( this.model );                        
            this.model = new CmdModel(model.toJSON());            
            this.listenTo( this.model, "change", this.render );
            
            this.render();
        },        
        
        show : function() {            
            this.$el.show();
            this.render();
        },
        
        hide : function() {
            this.$el.hide();
            
            app.cmdList.$el.show();
        },
        
        isVisible : function() {
            return this.$el.is(":visible");
        }
        
    });
    
    return EditView;
});