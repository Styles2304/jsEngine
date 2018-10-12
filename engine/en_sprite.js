"use strict";
//=======================================================//
// Sprite Class
//=======================================================//
    let Sprite = function(x, y, width, height, fps) {
        this.width = width || 25;
        this.height = height || 25;
        this.health = { cur: 100, tot: 100 }
        this.fps = fps;
        this.currentWorld = null;
        this.center = {
            x: Math.floor(this.width / 2),
            y: Math.floor(this.height / 2)
        }
        this.x = x;
        this.y = y;
        this.world = { x: x, y: y }
        this.anchor = { x: 0, y: 0 }
        this.offset = { x: 0, y: 0 }
        this.physics = {
            enabled: false,
            collision: Array(),
            collideWithWorld: false,
            worldBounce: false,
            angle: 0,
            velocity: {
                x: 0,
                y: 0
            },
            maxVelocity: 0,
            acceleration: 0,
            drag: 0,
            lockVelocityToRotation: false,
            angularVelocity: 0,
            angularMax: 0,
            angularDrag: 0,
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
        this.debug = false;
        this.debugData = {
            x: 0,
            y: 0,
            rgb: "0,0,0"
        }
    }

    Sprite.prototype = {
        init: function() {
            Game.prototype.drawSpriteSheet(this);
            this.sprite.canvas.getContext("2d").drawImage(this.sprite.sheet, 0, 0);
        },
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
            //=======================================================//
            // Sprite Animation
            //=======================================================//
                this.animation.ticks++;
                if (this.animation.ticks >= this.sprite.animations[this.animation.current].speed) {
                    this.animation.ticks = 0;
                    this.animation.index++;
                }
                if (this.animation.index >= this.sprite.animations[this.animation.current].loop.length) {
                    this.animation.index = 0;
                }

            //=======================================================//
            // Physics
            //=======================================================//
                const _p = this.physics;
                if (this.physics.enabled) {
                    var _col = _p.collision[0];
                    var _worldCol = _p.collision[0].world;

                //=======================================================//
                // World Collision
                //=======================================================//
                    if (_p.collideWithWorld) {
                        // Convert bounding box into world coordinates
                        _worldCol.c1.x = (this.world.x - this.anchor.x) + _col.c1.x;
                        _worldCol.c1.y = (this.world.y - this.anchor.y) + _col.c1.y;
                        _worldCol.c2.x = (this.world.x - this.anchor.x) + _col.c2.x;
                        _worldCol.c2.y = (this.world.y - this.anchor.y) + _col.c2.y;
                        _worldCol.c3.x = (this.world.x - this.anchor.x) + _col.c3.x;
                        _worldCol.c3.y = (this.world.y - this.anchor.y) + _col.c3.y;
                        _worldCol.c4.x = (this.world.x - this.anchor.x) + _col.c4.x;
                        _worldCol.c4.y = (this.world.y - this.anchor.y) + _col.c4.y;

                        // Left Bounds
                        if (
                            _worldCol.c1.x <= 0 ||
                            _worldCol.c2.x <= 0 ||
                            _worldCol.c3.x <= 0 ||
                            _worldCol.c4.x <= 0
                        ) {
                            if (_p.lockVelocityToRotation) {
                                _p.acceleration = 0;
                                if (_p.angle > 180 && _p.angle < 360 ) {
                                    _p.acceleration -= 100;
                                } else {
                                    _p.acceleration += 100;
                                }
                            } else {
                                _p.velocity.x = 0;
                                if (_p.worldBounce) { _p.velocity.x -= 100; }
                            }
                        }

                        // Right Bounds
                        if (
                            _worldCol.c1.x >= this.currentWorld.width ||
                            _worldCol.c2.x >= this.currentWorld.width ||
                            _worldCol.c3.x >= this.currentWorld.width ||
                            _worldCol.c4.x >= this.currentWorld.width
                        ) {
                            if (_p.lockVelocityToRotation) {
                                _p.acceleration = 0;
                                if (_p.angle >= 0 && _p.angle <= 180 ) {
                                    _p.acceleration -= 100;
                                } else {
                                    _p.acceleration += 100;
                                }
                            } else {
                                _p.velocity.x = 0;
                                if (_p.worldBounce) { _p.velocity.x += 100; }
                            }
                        }

                        // Top Bounds
                        if (
                            _worldCol.c1.y <= 0 ||
                            _worldCol.c2.y <= 0 ||
                            _worldCol.c3.y <= 0 ||
                            _worldCol.c4.y <= 0
                        ) {
                            if (_p.lockVelocityToRotation) {
                                _p.acceleration = 0;
                                if (_p.angle > 270 && _p.angle < 360 ||
                                    _p.angle >= 0 && _p.angle < 90
                                ) {
                                    _p.acceleration -= 100;
                                } else {
                                    _p.acceleration += 100;
                                }
                            } else {
                                _p.velocity.y = 0;
                                if (_p.worldBounce) { _p.velocity.y -= 100; }
                            }
                        }

                        // Bottom Bounds
                        if (
                            _worldCol.c1.y >= this.currentWorld.height ||
                            _worldCol.c2.y >= this.currentWorld.height ||
                            _worldCol.c3.y >= this.currentWorld.height ||
                            _worldCol.c4.y >= this.currentWorld.height
                        ) {
                            if (_p.lockVelocityToRotation) {
                                _p.acceleration = 0;
                                if (_p.angle >= 90 && _p.angle <= 270 ) {
                                    _p.acceleration -= 100;
                                } else {
                                    _p.acceleration += 100;
                                }
                            } else {
                                _p.velocity.y = 0;
                                if (_p.worldBounce) { _p.velocity.y += 100; }
                            }
                        }
                    }

                //=======================================================//
                // Velocity and Drag
                //=======================================================//
                    if (_p.angularVelocity > 0) { _p.angularVelocity -= _p.angularDrag; }
                    if (_p.angularVelocity < 0) { _p.angularVelocity += _p.angularDrag; }
                    _p.angularVelocity = Game.prototype.round(_p.angularVelocity, 2);
                    
                    this.setAngle(_p.angularVelocity);
                    
                    if (_p.thrusting == 0) {
                        if (_p.lockVelocityToRotation) {
                            if (_p.acceleration - (_p.drag / 10) <= 1) {
                                _p.acceleration = 0;
                            } else {
                                _p.acceleration -= (_p.drag / 10) * _p.acceleration;
                                _p.acceleration = Game.prototype.round(_p.acceleration, 2);
                            }
                        } else {
                            _p.velocity.x -= (_p.drag / 10) * _p.velocity.x;
                            _p.velocity.y -= (_p.drag / 10) * _p.velocity.y;
                        }
                    }

                    if (_p.lockVelocityToRotation) {
                        var _ang = (_p.angle + 90) * Math.PI / 180;
                        this.world.x -= Math.cos(_ang) * _p.acceleration / this.fps;
                        this.world.y -= Math.sin(_ang) * _p.acceleration / this.fps;
                        this.x -= Math.cos(_ang) * _p.acceleration / this.fps;
                        this.y -= Math.sin(_ang) * _p.acceleration / this.fps;
                    } else {
                        this.x -= _p.velocity.x / this.fps;
                        this.y -= _p.velocity.y / this.fps;
                        this.world.x -= _p.velocity.x / this.fps;
                        this.world.y -= _p.velocity.y / this.fps;
                    }

                //=======================================================//
                // Cell Tracking
                //=======================================================//
                }
            
            //=======================================================//
            // Coordinate "Cleanup"
            //=======================================================//
                if (_p.lockVelocityToRotation) {
                    if (Math.round(_p.acceleration) <= 1) {
                        this.x = Math.round(this.x);
                        this.y = Math.round(this.y);
                        this.world.x = Math.round(this.world.x);
                        this.world.y = Math.round(this.world.y);
                    }
                } else {
                    if ((Math.sign(_p.velocity.x) * _p.velocity.x) < 0.5 &&
                        (Math.sign(_p.velocity.y) * _p.velocity.y) < 0.5) {

                        this.x = Math.round(this.x);
                        this.y = Math.round(this.y);
                        this.world.x = Math.round(this.world.x);
                        this.world.y = Math.round(this.world.y);
                    }
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

            //=======================================================//
            // Debug
            //=======================================================//
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
                    context.fillText("Physics: " + _physics, this.debugData.x, this.debugData.y + 48);
                    context.fillText("Angle: " + Math.round(this.physics.angle), this.debugData.x, this.debugData.y + 60);
                    context.fillText("Angular Velocity: " + this.physics.angularVelocity, this.debugData.x, this.debugData.y + 72);
                    context.fillText("Velocity: " + Game.prototype.round(this.physics.velocity.x, 2) + ", " + Game.prototype.round(this.physics.velocity.y, 2), this.debugData.x, this.debugData.y + 84);
                    context.fillText("Acceleration: " + this.physics.acceleration, this.debugData.x, this.debugData.y + 96);
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
                        context.strokeStyle = "rgb(255,255,0)";
                        context.strokeRect(this.x - 2, this.y - 2, 5, 5);
                    }
                }
        },
        sleep: function() { /* executed on sleep */ },
        wakeup: function() { /* executed on wakeup */ },
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
        collideWithWorld: function(bounce) {
            bounce = bounce || false;
            this.physics.collideWithWorld = true;
            if (bounce) {
                this.physics.worldBounce = true;
            }
        },
        outOfBounds: function(world) {  // Unnecessary?
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
        setAngle: function(ang) {
            var _deg = ang * Math.PI / 180;
            var _angle = this.physics.angle += ang;
            if (_angle > 360) {
                this.physics.angle = _angle - 360;
            } else if (_angle < 0) {
                this.physics.angle = _angle + 360;
            } else if (_angle == 360) {
                this.physics.angle = 0;
            } else {
                this.physics.angle = _angle;
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
        lockVelocityToRotation: function() {
            this.physics.lockVelocityToRotation = true;
        },
        setAngularVelocity: function(thrust) {
            var _p = this.physics;
            if (_p.enabled) {
                if (thrust > 0) {
                    if (_p.angularVelocity < _p.angularMax) {
                        _p.angularVelocity += thrust;
                    }
                }
                if (thrust < 0) {
                    if (_p.angularVelocity > -_p.angularMax) {
                        _p.angularVelocity += thrust;
                    }
                }
            } else { console.log("Physics have not been enabled on this sprite."); }
        },
        setVelocityFromAngle: function(angle, velocity) {
            var _p = this.physics;
            if (_p.enabled) {
                _p.thrusting = 1; // Tracks whether thrust is being applied
                var _angle = (angle + 90) * Math.PI / 180;      // Convert to Radians

                // Add thrust to velocity
                _p.velocity.x += Math.cos(_angle) * velocity[0];
                _p.velocity.y += Math.sin(_angle) * velocity[1];

                // Make sure velocity hasn't exceeded limits
                if (_p.velocity.x > _p.maxVelocity) {
                    _p.velocity.x = _p.maxVelocity;
                } else if (_p.velocity.x < -_p.maxVelocity) {
                    _p.velocity.x = -_p.maxVelocity;
                }

                if (_p.velocity.y > _p.maxVelocity) {
                    _p.velocity.y = _p.maxVelocity;
                } else if (_p.velocity.y < -_p.maxVelocity) {
                    _p.velocity.y = -_p.maxVelocity;
                }
            } else { console.log("Physics have not been enabled on this sprite."); }
        },
        setLockedVelocityFromAngle: function(thrust) {
            var _p = this.physics;
            if (_p.enabled) {
                _p.thrusting = 1;
                _p.acceleration += thrust;
                if (_p.acceleration > _p.maxVelocity) {
                    _p.acceleration = _p.maxVelocity;
                }
            } else { console.log("Physics have not been enabled on this sprite."); }
        },
        setAngularPhysics: function(aMax, aDrag, maxVel, drag) {
            this.physics.angularMax = aMax;
            this.physics.angularDrag = aDrag;
            this.physics.maxVelocity = maxVel;
            this.physics.drag = drag;
        }
    }