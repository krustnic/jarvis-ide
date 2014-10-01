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
        
    });
    
});