/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-15
* Time: 03:21 PM
* To change this template use Tools | Templates.
*/
define( function( require ) {    

    describe("Views.CmdsListView", function () {
        
        before( function() {
            this.$fixture = $("<div></div>");            
        } );
        
        beforeEach(function() {            
            this.$fixture.appendTo( "#fixtures" );
            
            var Cmds       = require("collections/cmds");
            var sampleTest = require("tests/js/data/sample_test");
            
            var cmds = new Cmds(); 
            cmds.reset( sampleTest["last_version"]["code_browser"] ); 
            
            var View = require( "views/cmds-list" );
            this.view = new View( {
                cmds : cmds,
                el   : this.$fixture
            } );
            
        });       
        
        it("Load cmds", function() {
            expect( this.view.cmds.size() ).to.be.not.equal(0);
        });
        
        it("Events passed", function() {
            var clickFunc = sinon.spy();            
            
            this.view.on({
                "click:view" : clickFunc
            });
            
            this.view.$el.click();
            
            expect(clickFunc).to.have.been.calledOnce;
        });
        
        it("Send 'leave' event before remove command", function() {
            this.view.leaveCommandById = sinon.spy();
            
            var cmdsSize = this.view.cmds.size();            
            
            this.view.removeModel( this.view.cmds.at(0) );
            expect( this.view.cmds.size() ).to.be.equal( cmdsSize - 1 );
            
            expect(this.view.leaveCommandById).to.have.been.calledOnce;
            
        });
        
    });
    
});