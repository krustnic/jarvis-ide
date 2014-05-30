/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 05:43 PM
* To change this template use Tools | Templates.
*/

// Patching define (for CodeMirror)
(function() {
    var replacePaths = {
        "../../lib/codemirror" : "cm/codemirror"
    }
    
	var _define = define;
    define = function() {
        console.log("call require: ", arguments[0]);
        
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Array]' ) {
			for( var i in arguments[0] ) {
                if ( replacePaths[ arguments[0][i] ] != undefined ) {
                    console.log( "define replace: ", arguments[0][i], replacePaths[ arguments[0][i] ] );
                    arguments[0][i] = replacePaths[ arguments[0][i] ];
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
        "text"          : "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text",
        "bootstrap"     : "//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min",
        "cm"            : "//cdnjs.cloudflare.com/ajax/libs/codemirror/4.2.0"        
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
    }
});

var app = app || {};

require( [ "tools/jarvis-ide-child", "collections/cmds", "views/top-panel", "views/cmds-list", "views/edit" ], function( IDE, CmdsCollection, TopPanelView, CmdsListView, EditView ) {
    app.ide = new IDE();     
    
    app.topPanelView = new TopPanelView();
    app.cmds    = new CmdsCollection();
    app.cmdList = new CmdsListView( app.cmds );
    app.editView = new EditView();

    app.ide.on("upload", function( msg, callback ) {        
        app.test = JSON.parse( msg );
        
        var cmds = app.test["codeBrowser"];        
        app.cmds.reset( cmds );

        callback( {} );
    });

    app.ide.on("clear", function( msg, callback ) {
        app.cmds.reset( [] );

        callback( {} );
    });

    app.ide.on("get", function( msg, callback ) {
        //app.test["codeBrowser"] = app.cmds.toJSON();        

        callback( app.cmds.toJSON() );
    });

    app.ide.ready();
});