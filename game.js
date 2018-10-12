"use strict";

eDev.game.states.Game.prototype = {
    g: eDev.game,
    ctx: eDev.game.CONTEXT,
    currentWorld: eDev.game.states.Game.currentWorld,
    camera: eDev.game.states.Game.currentWorld.camera,
    // sprite: new Ship(eDev.game.center.x, eDev.game.center.y, 34, 34, eDev.game.FPS),
    start: function() { console.log("Game State"); },
    init: function() {
        this.currentWorld.resize(1600, 1600);
        this.currentWorld.createCells(400, 300);
        
        this.player = this.currentWorld.addSprite(Ship, this.g.center.x, this.g.center.y, 34, 34, this.g.FPS);

        this.currentWorld.enableCamera(true, 0, 0, this.g.WIDTH, this.g.HEIGHT, 0, 0, this.player);
        this.currentWorld.debugWorld();
    },
    update: function() {},
    draw: function() {}
}