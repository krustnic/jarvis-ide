/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-10-09
* Time: 10:49 AM
* To change this template use Tools | Templates.
*/

define( function( require ) {    

    describe("Views.Edit", function () {
        
        before( function() {
            this.$fixture = $("<div></div>");
        } );
        
        beforeEach(function() {            
            this.$fixture.appendTo( "#fixtures" );
            
            var EditView = require( "views/edit" );
            this.view = new EditView( {
                el : self.$fixture
            } );
        });
        
        it("Events passed", function() {
            var clickFunc = sinon.spy();            
            
            this.view.on({
                "click:view" : clickFunc
            });
            
            this.view.$el.click();
            
            expect(clickFunc).to.have.been.calledOnce;
        });
        
    });
    
});