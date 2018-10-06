"use strict";

eDev.game.states.Game.prototype = {
    g: eDev.game,
    ctx: eDev.game.CONTEXT,
    world: eDev.game.states.Game.currentWorld,
    sprite: new Sprite(eDev.game.center.x, eDev.game.center.y, 25, 25),
    start: function() { console.log("Game State"); },
    init: function() {
        this.sprite.enablePhysics();
        this.sprite.setAnchor(this.sprite.center.x, this.sprite.center.y);
        this.sprite.setOffset(2,2);
        this.sprite.setAngularPhysics(10, 0.25, 10, 0.25);
        this.sprite.currentWorld = this.world;
        this.sprite.worldCollision(true);
        this.sprite.physics.lockAngularVelocity = true;

        this.world.createCells(400, 300);

        this.sprite.debugSprite();
        this.world.debugWorld();
    },
    update: function() {
        if (this.g.controls.up) {
            this.sprite.accelerate(this.sprite.angle, 0.05);
        } else {
            this.sprite.physics.acceleration = 0;
        }

        if (this.g.controls.left) {
            this.sprite.setAngularMomentum(-0.75);
        }

        if (this.g.controls.right) {
            this.sprite.setAngularMomentum(0.75);
        }

        this.sprite.update();
    },
    draw: function() {
        this.sprite.draw(this.ctx);
    }
}