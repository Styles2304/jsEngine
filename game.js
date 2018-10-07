"use strict";

eDev.game.states.Game.prototype = {
    g: eDev.game,
    ctx: eDev.game.CONTEXT,
    world: eDev.game.states.Game.currentWorld,
    sprite: new Sprite(eDev.game.center.x, eDev.game.center.y, 25, 25, eDev.game.FPS),
    start: function() { console.log("Game State"); },
    init: function() {
        this.sprite.enablePhysics();

        this.sprite.setAnchor(this.sprite.center.x, this.sprite.center.y);
        this.sprite.setOffset(2,2);

        this.sprite.currentWorld = this.world;
        this.world.createCells(400, 300);

    // ==== Angular Physics Start ========================================//

        this.sprite.setAngularPhysics(
            10,     // Max Angular Velocity
            0.25,   // Angular Drag
            0.25,   // Max Accel
            10,     // Max Speed
            0.25    // Drag
        );

    // ==== Angular Physics End ==========================================//

        this.sprite.debugSprite();
        this.world.debugWorld();
    },
    update: function() {
        var _p = this.sprite.physics;

        if (this.g.controls.up) {
            this.sprite.setAcceleration(_p.angle, 0.5);
        } else { _p.acceleration = 0; }

        if (this.g.controls.down) {
            this.sprite.setAcceleration2(_p.angle, 10);
        }

        if (this.g.controls.left) {
            this.sprite.setAngularVelocity(-0.5);
        }

        if (this.g.controls.right) {
            this.sprite.setAngularVelocity(0.5);
        }

        this.sprite.update();
    },
    draw: function() {
        this.sprite.draw(this.ctx);
    }
}
