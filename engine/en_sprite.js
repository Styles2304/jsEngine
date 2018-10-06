"use strict";
//=======================================================//
// Sprite Class
//=======================================================//
    let Sprite = function(x, y, width, height) {
        this.width = width || 25;
        this.height = height || 25;
        this.health = {
            cur: 100,
            tot: 100
        }
        this.physics = {
            enabled: false,
            collision: Array(),
            collideWithWorld: false,
            velocity: {
                x: 0,
                y: 0
            },
            lockAngularVelocity: false,
            lockedAngle: 0,
            angularMomentum: 0,
            angularMax: 0,
            angularDrag: 0,
            acceleration: 0,
            maxAccel: 0.5,
            maxSpeed: 0,
            speed: 0,
            drag: 0,
            worldCollision: false
        }
        this.currentWorld = null;
        this.currentCell = null;
        this.center = {
            x: Math.floor(this.width / 2),
            y: Math.floor(this.height / 2)
        }
        this.x = x;
        this.y = y;
        this.world = {
            x: x,
            y: y
        }
        this.anchor = {
            x: 0,
            y: 0
        }
        this.offset = {
            x: 0,
            y: 0
        }
        this.angle = 0;
        this.debug = false;
        this.debugData = {
            x: 0,
            y: 0,
            rgb: "0,0,0"
        }
        this.animation = {
            current: "idle",
            ticks: 0,
            index: 0
        }
        this.sprite = {
            sheet: document.createElement("canvas"),
            canvas: document.createElement("canvas"),
            animations: {
                animationList: ["idle"],
                idle: {
                    ref: 0,
                    speed: 1,
                    loop: [1],
                    frames: {
                        1: [["255,255,0",[0,[7,8,9,10,11,12,13]],[1,[5,6,7,8,9,10,11,12,13,14,15]],[2,[4,5,6,7,8,9,10,11,12,13,14,15,16]],[3,[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]],[4,[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]],[5,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]],[6,[1,2,3,4,7,8,9,10,11,12,13,16,17,18,19]],[7,[0,1,2,3,8,7,9,10,11,12,13,17,18,19,20]],[8,[0,1,2,3,8,9,10,11,12,17,18,19,20]],[9,[0,1,2,3,4,7,8,9,10,11,12,13,16,17,18,19,20]],[10,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],[11,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],[12,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],[13,[0,1,2,3,4,6,7,8,9,10,11,12,13,14,16,17,18,19,20]],[14,[1,2,3,6,7,8,9,10,11,12,13,14,17,18,19]],[15,[1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19]],[16,[2,3,4,5,6,14,15,16,17,18]],[17,[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]],[18,[4,5,6,7,8,9,10,11,12,13,14,15,16]],[19,[5,6,7,8,9,10,11,12,13,14,15]],[20,[7,8,9,10,11,12,13]]],["0,0,0",[6,[5,6,14,15]],[7,[4,16]],[8,[5,6,14,15]],[9,[5,6,14,15]],[13,[5,15]],[14,[4,5,15,16]],[15,[6,14]],[16,[7,8,9,10,11,12,13]]],["255,255,255",[7,[5,6,14,15]],[8,[4,7,13,16]]]]
                    }
                }
            }
        }

        Game.prototype.drawSpriteSheet(this);

        var _sprite = this.sprite;
        var _anim = this.animation;
        var _ctx = this.sprite.canvas.getContext("2d");

        // draw sprite to a canvas that can be transformed
        _ctx.drawImage(_sprite.sheet, 0, 0);
    }

    Sprite.prototype = {
        debugSprite: function(rgb, x, y) {
            this.debug = true;

            x = x || 5;
            y = y || 12;
            rgb = rgb || "255,255,255";

            this.debugData.x = x;
            this.debugData.y = y;
            this.debugData.rgb = rgb;
        },
        update: function() {
            this.animation.ticks++;
            if (this.animation.ticks >= this.sprite.animations[this.animation.current].speed) {
                this.animation.ticks = 0;
                this.animation.index++;
            }
            if (this.animation.index >= this.sprite.animations[this.animation.current].loop.length) {
                this.animation.index = 0;
            }

            if (this.physics.enabled) {
                var _p = this.physics;
                var _col = _p.collision[0];
                var _worldCol = _p.collision[0].world;

                // Convert bounding box into world coordinates
                _worldCol.c1.x = (this.world.x - this.anchor.x) + _col.c1.x;
                _worldCol.c1.y = (this.world.y - this.anchor.y) + _col.c1.y;
                _worldCol.c2.x = (this.world.x - this.anchor.x) + _col.c2.x;
                _worldCol.c2.y = (this.world.y - this.anchor.y) + _col.c2.y;
                _worldCol.c3.x = (this.world.x - this.anchor.x) + _col.c3.x;
                _worldCol.c3.y = (this.world.y - this.anchor.y) + _col.c3.y;
                _worldCol.c4.x = (this.world.x - this.anchor.x) + _col.c4.x;
                _worldCol.c4.y = (this.world.y - this.anchor.y) + _col.c4.y;

                // Handles world boundaries collision
                if (_p.worldCollision) {
                    if (_worldCol.c1.x > this.currentWorld.width ||
                        _worldCol.c2.x > this.currentWorld.width ||
                        _worldCol.c3.x > this.currentWorld.width ||
                        _worldCol.c4.x > this.currentWorld.width) {

                        if (this.angle > 0 && this.angle < 180) {
                            _p.velocity.x = 0;
                        }
                    }

                    if (_worldCol.c1.x < this.currentWorld.x ||
                        _worldCol.c2.x < this.currentWorld.x ||
                        _worldCol.c3.x < this.currentWorld.x ||
                        _worldCol.c4.x < this.currentWorld.x) {

                        if (this.angle > 180 && this.angle < 360) {
                            _p.velocity.x = 0;
                        }
                    }

                    if (_worldCol.c1.y > this.currentWorld.height ||
                        _worldCol.c2.y > this.currentWorld.height ||
                        _worldCol.c3.y > this.currentWorld.height ||
                        _worldCol.c4.y > this.currentWorld.height) {
                        
                        if (this.angle > 90 && this.angle < 270) {
                            _p.velocity.y = 0;
                        }
                    }

                    if (_worldCol.c1.y < this.currentWorld.y ||
                        _worldCol.c2.y < this.currentWorld.y ||
                        _worldCol.c3.y < this.currentWorld.y ||
                        _worldCol.c4.y < this.currentWorld.y) {

                        if (this.angle > 270 && this.angle <= 360 ||
                            this.angle >= 0 && this.angle < 90) {
                            _p.velocity.y = 0;
                        }
                    }
                }

                // Applies velocity, momentum, and acceleration to sprite
                this.world.x -= _p.velocity.x;
                this.world.y -= _p.velocity.y;

                this.x -= _p.velocity.x;
                this.y -= _p.velocity.y;


                // Angular Momentum
                if (_p.angularMomentum > 0) {
                    _p.angularMomentum -= _p.angularDrag;
                }
                if (_p.angularMomentum < 0) {
                    _p.angularMomentum += _p.angularDrag;
                }
                this.setAngle(_p.angularMomentum);
                // Drag
                if (_p.speed > 0) {
                    _p.speed -= _p.drag;
                }
                if (_p.speed < 0) {
                    _p.speed = 0;
                }
                _p.speed = Math.round(_p.speed * 1e2) / 1e2;
                if (_p.lockAngularVelocity) {
                    if (_p.speed > 0) {
                        this.setAngularVelocity(_p.lockedAngle, _p.speed);
                    }
                } else {
                    if (_p.speed > 0) {
                        this.setAngularVelocity(this.angle, _p.speed);
                    }
                }
                // Tracks which cell the sprite is in
                for (var a = 0; a < this.currentWorld.cells.length; a++) {
                    var _cell = this.currentWorld.cells[a];
                    if (this.x > _cell.x &&
                        this.x < _cell.x + _cell.width &&
                        this.y > _cell.y &&
                        this.y < _cell.y + _cell.height) {
                        
                        this.currentCell = _cell.key;
                    }
                }
            }
            // Cleans up coordinates once moment has "stopped"
            if (_p.speed < 0.1) {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                this.world.x = Math.round(this.world.x);
                this.world.y = Math.round(this.world.y);
            }
        },
        draw: function(context) {
            var _sprite = this.sprite;
            var _anim = this.animation;
            var _ctx = _sprite.canvas.getContext("2d"); // The sprites personal canvas context
            context.drawImage(
                _sprite.canvas,
                _anim.index * this.width,
                _sprite.animations[_anim.current].ref * this.height,
                this.width,
                this.height,
                this.x - this.anchor.x,
                this.y - this.anchor.y,
                this.width,
                this.height
            );
            if (this.debug) {
                context.save();
                context.font = "12px Courier";
                context.shadowColor = "rgb(0,0,0)";
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                context.fillStyle = "rgb(" + this.debugData.rgb + ")";
                context.fillText("World Position: (" + this.world.x + ", " + this.world.y + ")", this.debugData.x, this.debugData.y);
                context.fillText("Screen Position: (" + this.x + ", " + this.y + ")", this.debugData.x, this.debugData.y + 12);
                context.fillText("Health: " + this.health.cur + "/" + this.health.tot, this.debugData.x, this.debugData.y + 24);
                if (this.physics.enabled) { var _physics = "Enabled"; } else { var _physics = "Disabled"; }
                context.fillText("Physics: " + _physics, this.debugData.x, this.debugData.y + 36);
                context.fillText("Angle: " + this.angle, this.debugData.x, this.debugData.y + 48);
                context.fillText("Locked Angle: " + this.physics.lockedAngle, this.debugData.x, this.debugData.y + 60);
                context.fillText("Angular Momentum: " + this.physics.angularMomentum, this.debugData.x, this.debugData.y + 72);
                context.fillText("Acceleration: " + this.physics.acceleration, this.debugData.x, this.debugData.y + 84);
                context.fillText("Speed: " + this.physics.speed, this.debugData.x, this.debugData.y + 96);
                context.fillText("Velocity: " + this.physics.velocity.x + ", " + this.physics.velocity.y, this.debugData.x, this.debugData.y + 108);
                context.fillText("Current World: " + this.currentWorld.key, this.debugData.x, this.debugData.y + 120);
                context.fillText("Current Cell: " + this.currentCell, this.debugData.x, this.debugData.y + 132);
                context.restore();
                if (this.physics.enabled) {
                    for (var a = 0; a < this.physics.collision.length; a++) {
                        var _col = this.physics.collision;
                        context.strokeStyle = "rgb(255,0,255)";
                        context.beginPath();
                        context.moveTo((this.x - this.anchor.x) + _col[a].c1.x,(this.y - this.anchor.y) + _col[a].c1.y);
                        context.lineTo((this.x - this.anchor.x) + _col[a].c2.x,(this.y - this.anchor.y) + _col[a].c2.y);
                        context.lineTo((this.x - this.anchor.x) + _col[a].c3.x,(this.y - this.anchor.y) + _col[a].c3.y);
                        context.lineTo((this.x - this.anchor.x) + _col[a].c4.x,(this.y - this.anchor.y) + _col[a].c4.y);
                        context.lineTo((this.x - this.anchor.x) + _col[a].c1.x,(this.y - this.anchor.y) + _col[a].c1.y);
                        context.stroke();
                    }
                    context.fillStyle = "rgb(255,0,0)";
                    context.fillRect(this.x - 1, this.y - 1, 3, 3);
                    context.fillStyle = "rgb(0,255,0)";
                    context.fillRect(this.physics.collision[0].world.x, this.physics.collision[0].world.y, 3, 3);
                }
            }
        },
        enablePhysics: function(advanced) {
            this.physics.enabled = true;
            advanced = advanced || false;
            if (!advanced) {
                this.physics.collision.push({
                    c1: { x: -this.anchor.x, y: -this.anchor.y },
                    c2: { x: -this.anchor.x + this.width, y: -this.anchor.y },
                    c3: { x: -this.anchor.x + this.width, y: -this.anchor.y + this.height },
                    c4: { x: -this.anchor.x, y: -this.anchor.y + this.height },
                    world: {
                        c1: { x: this.world.x - this.anchor.x, y: this.world.y - this.anchor.y },
                        c2: { x: this.world.x - this.anchor.x + this.width, y: this.world.y - this.anchor.y },
                        c3: { x: this.world.x - this.anchor.x + this.width, y: this.world.y - this.anchor.y + this.height },
                        c4: { x: this.world.x - this.anchor.x, y: this.world.y - this.anchor.y + this.height }
                    }
                });
            }
        },
        addCollider: function(x, y, width, height) {
            this.physics.collision.push({
                x: x,
                y: y,
                width: width,
                height: height
            });
        },
        setAnchor: function(x, y) {
            this.anchor.x = x;
            this.anchor.y = y;
        },
        setOffset: function(x, y) {
            this.offset.x = x;
            this.offset.y = y;
            var _ctx = this.sprite.canvas.getContext("2d");
            _ctx.clearRect(0, 0, this.width, this.height);
            _ctx.drawImage(this.sprite.sheet, this.offset.x, this.offset.y);
        },
        setAngle: function(ang) {
            var _deg = ang * Math.PI / 180;
            var _angle = this.angle += ang;
            if (_angle > 360) {
                this.angle = _angle - 360;
            } else if (_angle < 0) {
                this.angle = _angle + 360;
            } else if (_angle == 360) {
                this.angle = 0;
            } else {
                this.angle = _angle;
            }
            // Moves sprite image
            var _ctx = this.sprite.canvas.getContext("2d");
            _ctx.clearRect(0, 0, this.width, this.height);
            _ctx.translate(this.width / 2, this.height / 2);
            _ctx.rotate(_deg);
            _ctx.drawImage(
                this.sprite.sheet,
                0,
                0,
                this.width,
                this.height,
                (-this.width / 2) + this.offset.x,
                (-this.height / 2) + this.offset.y,
                this.width,
                this.height
            );
            _ctx.translate(-this.width / 2, -this.height / 2);
            // Moves bounding boxes
            if (this.physics.enabled && this.physics.collision.length > 0) {
                var _col = this.physics.collision[0];
                _col.c1 = Game.prototype.newPoint(_col.c1, this.center, _deg);
                _col.c2 = Game.prototype.newPoint(_col.c2, this.center, _deg);
                _col.c3 = Game.prototype.newPoint(_col.c3, this.center, _deg);
                _col.c4 = Game.prototype.newPoint(_col.c4, this.center, _deg);
            }
        },
        worldCollision: function(enabled) {
            if (this.physics.enabled) {
                this.physics.worldCollision = true;
            }
        },
        outOfBounds: function(world) {
            if (this.physics.enabled) {
                for (var a = 0; a < this.physics.collision.length; a++) {
                    var _wCol = this.physics.collision[0].world;
                    if (
                        _wCol.c1.x < 0 ||
                        _wCol.c1.x > world.width ||
                        _wCol.c1.y < 0 ||
                        _wCol.c1.y > world.height ||
                        _wCol.c2.x < 0 ||
                        _wCol.c2.x > world.width ||
                        _wCol.c2.y < 0 ||
                        _wCol.c2.y > world.height ||
                        _wCol.c3.x < 0 ||
                        _wCol.c3.x > world.width ||
                        _wCol.c3.y < 0 ||
                        _wCol.c3.y > world.height ||
                        _wCol.c4.x < 0 ||
                        _wCol.c4.x > world.width ||
                        _wCol.c4.y < 0 ||
                        _wCol.c4.y > world.height
                    ) { return true; } else { return false; }
                }
            }
        },
        accelerate: function(angle, thrust) {
            var _p = this.physics;
            if (_p.enabled) {
                if (_p.acceleration < _p.maxAccel) {
                    _p.acceleration += thrust;
                }
                if (_p.speed < _p.maxSpeed) {
                    _p.speed += _p.acceleration;
                }
                this.setAngularVelocity(angle, _p.speed);
            }
        },
        setAngularVelocity: function(angle, speed) {
            if (this.physics.enabled) {
                var _p = this.physics;
                var _ang = (angle + 90) * Math.PI / 180;
                _p.lockedAngle = angle;
                _p.velocity = {
                    x: Math.cos(_ang) * speed,
                    y: Math.sin(_ang) * speed
                }
            }
        },
        setAngularMomentum: function(thrust) {
            var _p = this.physics;
            if (_p.enabled) {
                if (thrust > 0) {
                    if (_p.angularMomentum < _p.angularMax) {
                        _p.angularMomentum += thrust;
                    }
                }
                if (thrust < 0) {
                    if (_p.angularMomentum > -_p.angularMax) {
                        _p.angularMomentum += thrust;
                    }
                }
            }
        },
        setAngularPhysics: function(aMax, aDrag, maxSpeed, drag) {
            this.physics.angularMax = aMax;
            this.physics.angularDrag = aDrag;
            this.physics.maxSpeed = maxSpeed;
            this.physics.drag = drag;
        },
        lockAngularVelocity: function() {
            this.physics.lockAngularVelocity = true;
        }
    }
