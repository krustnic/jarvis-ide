/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-05-21
* Time: 05:43 PM
* To change this template use Tools | Templates.
*/

require.config({    
    //urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "/src",
    paths: {
        "backbone"   : "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        "underscore" : "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
        "jquery"     : "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
        "text"       : "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text"
    },
    shim : {
        "backbone" : {
            deps : [ "underscore", "jquery", "text" ],
            export : "Backbone"
        },
        
        "underscore" : {
            export : "_"
        }
    }
});

var app = app || {};

require( [ "tools/jarvis-ide-child", "collections/cmds", "views/cmds-list" ], function( IDE, CmdsCollection, CmdsListView ) {
    app.ide = new IDE();     
    
    app.cmds    = new CmdsCollection();
    app.cmdList = new CmdsListView( app.cmds );

    app.ide.on("upload", function( msg, callback ) {        
        var cmds = JSON.parse( msg )["codeBrowser"];        
        app.cmds.reset( cmds );

        callback( {} );
    });

    app.ide.on("clear", function( msg, callback ) {
        app.cmds.reset( [] );

        callback( {} );
    });

    app.ide.on("get", function( msg, callback ) {
        console.log("Child event: ", msg);                

        callback( {} );
    });

    app.ide.ready();
});