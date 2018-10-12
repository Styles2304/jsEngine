"use strict";
//=======================================================//
// State Class
//=======================================================//
    let State = function(x, y, width, height, oneTime, doLoop, fps, ctx) {
        this.worlds = [];
        this.oneTime = oneTime;
        this.doLoop = doLoop;
        this.initialized = false;
        this.gameWidth = width;
        this.gameHeight = height;
        this.fps = fps;
        this.ctx = ctx;

        this.worlds.push(new World(0, 0,0, this.gameWidth, this.gameHeight));
        this.currentWorld = this.worlds[0];
    }

    State.prototype.run = function() {
        let _that = this;

        var _tempInterval = setInterval(function() {
            for (var a = 0; a < _that.oneTime.length; a++) {
                if (_that.oneTime[a] == "init") {
                    if (!_that.initialized) {
                        _that.prototype[_that.oneTime[a]]();

                        // Initiates sprites added to current world
                        for (var e = 0; e < _that.currentWorld.sprites.length; e++) {
                            _that.currentWorld.sprites[e].init();
                        }

                        // Flags state as initialized to prevent
                        // redundancy when switching states
                        _that.initialized = true;
                    }
                } else {
                    _that.prototype[_that.oneTime[a]]();
                }
            }
            clearInterval(_tempInterval);
        });

        this.run.runner = setInterval(function() {
            for (var a = 0; a < _that.doLoop.length; a++) {
                if (_that.doLoop[a] == "update") {
                    // Runs updates for each sprite in current world... this seems wrong
                    for (var e = 0; e < _that.currentWorld.sprites.length; e++) {
                        _that.currentWorld.sprites[e].update();
                    }

                    // Controls camera and world movement
                }

                if (_that.doLoop[a] == "draw") {
                    Game.prototype.refresh(_that.ctx, _that.gameWidth, _that.gameHeight);

                    if (_that.currentWorld.debug) {
                        _that.ctx.drawImage(_that.currentWorld.canvas, _that.currentWorld.x, _that.currentWorld.y);
                    }

                    // Draws each sprite in current world... this is definitely wrong
                    for (var e = 0; e < _that.currentWorld.sprites.length; e++) {
                        _that.currentWorld.sprites[e].draw(_that.ctx);
                    }
                }

                _that.prototype[_that.doLoop[a]]();
            }
        }, 1000 / this.fps);
    }
