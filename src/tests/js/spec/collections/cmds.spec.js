/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-09-30
* Time: 12:13 PM
* To change this template use Tools | Templates.
*/
define(function(require) {    

    describe("Collections.Cmds", function () {
        
        beforeEach(function() {
            var Cmds       = require("collections/cmds");
            var sampleTest = require("tests/js/data/sample_test");
            
            this.collection = new Cmds(); 
            this.collection.reset( sampleTest["last_version"]["code_browser"] );            
        });        
        
        it("Initialize from test object", function () {                                   
            expect(this.collection.size()).to.equal(2);            
        });  
        
        it("Sequential positions after load", function() {            
            var position = 0;
            this.collection.each(function(model) {
                expect( model.get("position") ).to.equals( position );                
                position += 1;
            }, this);
        });
        
        it("No selected commands after load", function() {            
            this.collection.each(function(model) {                
                expect( model.get("isSelected") ).to.equals( false );                                
            }, this);
        });
        
        it("setSelectedAt. One selected at a time", function() {                
            
            this.collection.setSelectedAt( 0 );
            this.collection.setSelectedAt( 1 );
            
            var selectedCount = 0;
            this.collection.each(function(model) {                
                if ( model.get("isSelected") ) selectedCount += 1;                
            }, this);
            
            expect( selectedCount ).to.equals( 1 );                                
        });
        
        it("setSelected. One selected at a time");
        it("getSelected");
        
        it("'add' always add main command properties as strings", function() {
            this.collection.reset([]);
            
            var action = {
                command : "sendKeys",
                selector : "div",
                value : 13                        
            }
                    
            this.collection.addAction( action );  
            
            this.collection.each(function( model ) {
                var obj = model.toJSON();
                for( var key in obj ) {
                    if ( key in this.collection._propertiesShouldBeString ) {
                        assert.typeOf( obj[key], "string" );
                    }
                }
            }, this);
        });
        
        it("sequental 'type' and 'change' commands with same selector and value are collapsed", function() {
            this.collection.reset([]);
            
            var typeAction = {
                command : "type",
                selector : "div",
                value : 123,
                valueType : "plain"
            }
            
            var changeAction = {
                command : "change",
                selector : "div",
                value : 123,
                valueType : "plain"
            }
                    
            this.collection.addAction( typeAction, true );  
            this.collection.addAction( changeAction, true );  
            
            assert.equal( this.collection.at(0).get("command"), "type" );            
            assert.equal( this.collection.size(), 1 );            
            
        });
        
        it("sequental 'type', 'sendKeys: ENTER', 'change' commands with same selector and value are collapsed", function() {
            this.collection.reset([]);
            
            var typeAction = {
                command : "type",
                selector : "div",
                value : 123,
                valueType : "plain"
            }
            
            var sendkeysAction = {
                command : "sendKeys",
                selector : "div",
                value : 13,
                valueType : "plain"
            }
            
            var changeAction = {
                command : "change",
                selector : "div",
                value : 123,
                valueType : "plain"
            }
                    
            this.collection.addAction( typeAction, true );  
            this.collection.addAction( sendkeysAction, true );  
            this.collection.addAction( changeAction, true );
            
            assert.equal( this.collection.at(0).get("command"), "type" );
            assert.equal( this.collection.at(1).get("command"), "sendKeys" );            
            assert.equal( this.collection.size(), 2 );            
            
        });
        
    });
    
});