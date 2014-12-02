/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 05:43 PM
* To change this template use Tools | Templates.
*/

// Patching define (for CodeMirror)
(function() {    
    
    if (typeof define != "function" || !define.amd) {        
        return;
    }
    
	var _define = define;
    define = function() {        
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Array]' ) {
			for( var i in arguments[0] ) {
                var redefine = require.s.contexts._.config.redefine;
                if ( redefine[ arguments[0][i] ] != undefined ) {                    
                    arguments[0][i] = redefine[ arguments[0][i] ];
                }
            }			            
        }
        
        return _define.apply( this, arguments );
    }

    define.amd = _define.amd;    
})();

require.config({    
    //urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "src",
    paths: {
        "backbone"      : "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        "underscore"    : "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
        "jquery"        : "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
        "jqueryui"      : "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min",
        "text"          : "libs/text",
        "bootstrap"     : "//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min",
        "cm"            : "//cdnjs.cloudflare.com/ajax/libs/codemirror/4.2.0",
        "acorn"         : "libs/acorn"
    },
    shim : {
        "backbone" : {
            deps : [ "underscore", "jquery", "text" ],
            export : "Backbone"
        },
        
        "underscore" : {
            export : "_"
        },
        
        "bootstrap" : {
            deps : [ "jquery" ]
        },
        
        "jqueryui" : {
            deps : [ "jquery" ]
        }
    },
    redefine : {
        "../../lib/codemirror" : "cm/codemirror"
    }
});

var app = app || {};

require( [ "tools/jarvis-ide-child", "collections/cmds", "views/top-panel", "views/cmds-list", "views/edit" ], function( IDE, CmdsCollection, TopPanelView, CmdsListView, EditView ) {
    app.ide = new IDE();     
    
    app.topPanelView = new TopPanelView();
    app.cmds    = new CmdsCollection();
    app.cmdList = new CmdsListView({
        cmds : app.cmds
    });
    app.editView = new EditView();
    
    Backbone.on("send-resize", function() {
        app.ide.sendResize();        
    });

    app.ide.on("upload", function( msg, callback ) {             
        app.editView.hide();
        
        app.test = JSON.parse( msg );        
        
        var cmds = app.test["code_browser"];        
        app.cmds.reset( cmds );      

        callback( {} );
    });

    app.ide.on("clear", function( msg, callback ) {
        app.cmds.reset( [] );
        app.test = {};

        callback( {} );
    });

    app.ide.on("get", function( msg, callback ) {
        if ( app.test == undefined ) app.test = {};        
            
        app.test["code_browser"] = app.cmds.toJSON();        

        callback( app.test );
    });
    
    app.ide.on("add", function( msg, callback ) {            
        app.cmds.addAction( msg, true );

        callback( app.test );
    });
    
    app.ide.on("get-current-cmd", function( msg, callback ) {            
        var cmd = app.cmds.getSelected();
        if ( cmd != null ) cmd = cmd.toJSON();
                
        callback( cmd );
    });
    
    app.ide.on("get-current-select-next", function( msg, callback ) {            
        var cmd = app.cmds.getSelectedAndSelectNext();
        if ( cmd != null ) cmd = cmd.toJSON();
                
        callback( cmd );
    });  
    
    app.ide.on("set-selected-at", function( msg, callback ) {            
		app.cmds.setSelectedAt( msg )                        
        callback();
    });  
    
    app.ide.on("get-ide-size", function( msg, callback ) {            
        var size = {};
        size["width"] = $(document).width();
        size["height"] = $(document).height();
        
        callback( size );
    });    
    
    app.ide.on("set-selector", function( msg, callback ) {            
        //console.log( "set-selector: ", msg );
        Backbone.trigger( "set-selector", msg );
    });    
    
    $(window).on("resize", function() {                
        app.ide.sendResize();
    });

    app.ide.ready();
});