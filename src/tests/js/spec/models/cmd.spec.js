/**
* Created with jarvis-ide.
* User: krustnic
* Date: 2014-09-30
* Time: 11:23 AM
* To change this template use Tools | Templates.
*/
define(function(require) {

    describe("Models.Cmd", function () {
        
        it("has default values", function () {
            var Cmds = require("models/cmd");
            // Create empty note model.            
            var model = new Cmds();
            expect(model).to.be.ok;
            expect(model.get("action")).to.equal("");
            expect(model.get("selector")).to.equal("");
            expect(model.get("value")).to.equal("");
            expect(model.get("position")).to.equal(0);            
            expect(model.get("isSelected")).to.equal(false);            
        });               
        
    });
    
});

