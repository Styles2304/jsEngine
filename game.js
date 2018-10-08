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

        this.sprite.setAngularPhysics(
            10,     // Max Angular Velocity
            0.1,    // Angular Drag
            [200, 200],     // Max Velocity in pixels per second
            0.7     // Drag
        );

        this.sprite.lockVelocityToRotation();

        this.sprite.debugSprite();
        this.world.debugWorld();
    },
    update: function() {
        var _p = this.sprite.physics;

        if (this.g.controls.up) {
            this.sprite.setVelocityFromAngle(_p.angle, 5);
        } else { _p.thrust = 0; }

        if (this.g.controls.down) {
            this.sprite.setVelocityFromAngle(_p.angle - 180, 2);
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