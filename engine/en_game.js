"use strict";
//=======================================================//
// Game Class
//=======================================================//
    let Game = function(canvas, container, width, height, fps) {
        this.CANVAS = document.getElementById(canvas);
        this.CONTAINER = document.getElementById(container);
        this.CONTEXT = this.CANVAS.getContext("2d");
        this.WIDTH = width;
        this.HEIGHT = height;
        this.FPS = fps;
        this.center = {
            x: Math.floor(this.WIDTH / 2),
            y: Math.floor(this.HEIGHT / 2)
        }
        this.controls = {
            enter: false,
            shift: false,
            space: false,
            left: false,
            up: false,
            right: false,
            down: false,
            zero: false,
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
            seven: false,
            eight: false,
            nine: false,
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
            g: false,
            h: false,
            i: false,
            j: false,
            k: false,
            l: false,
            m: false,
            n: false,
            o: false,
            p: false,
            q: false,
            r: false,
            s: false,
            t: false,
            u: false,
            v: false,
            w: false,
            x: false,
            y: false,
            z: false
        }
        this.states = {}
        this.curState = null;
        this.debug = false;

        this.run();
    }
    Game.prototype.refresh = function(ctx, width, height) { ctx.clearRect(0, 0, width, height); }
    Game.prototype.addState = function(name, oneTime, doLoop) {
        this.states[name] = new State(0, 0, this.WIDTH, this.HEIGHT, oneTime, doLoop, this.FPS, this.CONTEXT);
    }
    Game.prototype.startState = function(state) {
        if (this.curState !== null) {
            clearInterval(this.states[this.curState].run.runner);
        }
        this.curState = state;
        this.states[state].run();
    }
    Game.prototype.update = function() { console.log("Update Not Set"); }
    Game.prototype.run = function() {
        let _that = this;
        this.CANVAS.width = this.WIDTH;
        this.CANVAS.height = this.HEIGHT;

        this.CONTAINER.setAttribute(
            "style",
            "width:" + this.WIDTH + "px; " +
            "height: " + this.HEIGHT + "px; " +
            "margin-left: auto; " +
            "margin-right: auto; " +
            "margin-top: 25px;" +
            "border: 1px solid #000;"
        );

        window.onkeydown = function (e) {
            var code = e.keyCode ? e.keyCode : e.which;
            switch (e.keyCode) {
                case 13: { _that.controls.enter = true; _that.input = true; e.preventDefault(); } break;
                case 16: { _that.controls.shift = true; e.preventDefault(); } break;
                case 32: { _that.controls.space = true; e.preventDefault(); } break;

                case 37: { _that.controls.left = true; e.preventDefault(); } break;
                case 38: { _that.controls.up = true; e.preventDefault(); } break;
                case 39: { _that.controls.right = true; e.preventDefault(); } break;
                case 40: { _that.controls.down = true; e.preventDefault(); } break;

                case 48: { _that.controls.zero = true; e.preventDefault(); } break;
                case 49: { _that.controls.one = true; e.preventDefault(); } break;
                case 50: { _that.controls.two = true; e.preventDefault(); } break;
                case 51: { _that.controls.three = true; e.preventDefault(); } break;
                case 52: { _that.controls.four = true; e.preventDefault(); } break;
                case 53: { _that.controls.five = true; e.preventDefault(); } break;
                case 54: { _that.controls.six = true; e.preventDefault(); } break;
                case 55: { _that.controls.seven = true; e.preventDefault(); } break;
                case 56: { _that.controls.eight = true; e.preventDefault(); } break;
                case 57: { _that.controls.nine = true; e.preventDefault(); } break;

                case 65: { _that.controls.a = true; e.preventDefault(); } break;
                case 66: { _that.controls.b = true; e.preventDefault(); } break;
                case 67: { _that.controls.c = true; e.preventDefault(); } break;
                case 68: { _that.controls.d = true; e.preventDefault(); } break;
                case 69: { _that.controls.e = true; e.preventDefault(); } break;
                case 70: { _that.controls.f = true; e.preventDefault(); } break;
                case 71: { _that.controls.g = true; e.preventDefault(); } break;
                case 72: { _that.controls.h = true; e.preventDefault(); } break;
                case 73: { _that.controls.i = true; e.preventDefault(); } break;
                case 74: { _that.controls.j = true; e.preventDefault(); } break;
                case 75: { _that.controls.k = true; e.preventDefault(); } break;
                case 76: { _that.controls.l = true; e.preventDefault(); } break;
                case 77: { _that.controls.m = true; e.preventDefault(); } break;
                case 78: { _that.controls.n = true; e.preventDefault(); } break;
                case 79: { _that.controls.o = true; e.preventDefault(); } break;
                case 80: { _that.controls.p = true; e.preventDefault(); } break;
                case 81: { _that.controls.q = true; e.preventDefault(); } break;
                case 82: { _that.controls.r = true; e.preventDefault(); } break;
                case 83: { _that.controls.s = true; e.preventDefault(); } break;
                case 84: { _that.controls.t = true; e.preventDefault(); } break;
                case 85: { _that.controls.u = true; e.preventDefault(); } break;
                case 86: { _that.controls.v = true; e.preventDefault(); } break;
                case 87: { _that.controls.w = true; e.preventDefault(); } break;
                case 88: { _that.controls.x = true; e.preventDefault(); } break;
                case 89: { _that.controls.y = true; e.preventDefault(); } break;
                case 90: { _that.controls.z = true; e.preventDefault(); } break;
            }
        }

        window.onkeyup = function (e) {
            var code = e.keyCode ? e.keyCode : e.which;
            switch (e.keyCode) {
                case 13: { _that.controls.enter = false; } break;
                case 16: { _that.controls.shift = false; } break;
                case 32: { _that.controls.space = false; } break;

                case 37: { _that.controls.left = false; } break;
                case 38: { _that.controls.up = false; } break;
                case 39: { _that.controls.right = false; } break;
                case 40: { _that.controls.down = false; } break;

                case 48: { _that.controls.zero = false; } break;
                case 49: { _that.controls.one = false; } break;
                case 50: { _that.controls.two = false; } break;
                case 51: { _that.controls.three = false; } break;
                case 52: { _that.controls.four = false; } break;
                case 53: { _that.controls.five = false; } break;
                case 54: { _that.controls.six = false; } break;
                case 55: { _that.controls.seven = false; } break;
                case 56: { _that.controls.eight = false; } break;
                case 57: { _that.controls.nine = false; } break;

                case 65: { _that.controls.a = false; } break;
                case 66: { _that.controls.b = false; } break;
                case 67: { _that.controls.c = false; } break;
                case 68: { _that.controls.d = false; } break;
                case 69: { _that.controls.e = false; } break;
                case 70: { _that.controls.f = false; } break;
                case 71: { _that.controls.g = false; } break;
                case 72: { _that.controls.h = false; } break;
                case 73: { _that.controls.i = false; } break;
                case 74: { _that.controls.j = false; } break;
                case 75: { _that.controls.k = false; } break;
                case 76: { _that.controls.l = false; } break;
                case 77: { _that.controls.m = false; } break;
                case 78: { _that.controls.n = false; } break;
                case 79: { _that.controls.o = false; } break;
                case 80: { _that.controls.p = false; } break;
                case 81: { _that.controls.q = false; } break;
                case 82: { _that.controls.r = false; } break;
                case 83: { _that.controls.s = false; } break;
                case 84: { _that.controls.t = false; } break;
                case 85: { _that.controls.u = false; } break;
                case 86: { _that.controls.v = false; } break;
                case 87: { _that.controls.w = false; } break;
                case 88: { _that.controls.x = false; } break;
                case 89: { _that.controls.y = false; } break;
                case 90: { _that.controls.z = false; } break;
            }
        }
    }
    Game.prototype.drawSpriteSheet = function(object) {
        var _ctx = object.sprite.sheet.getContext("2d");

        var _step = {
            x: object.width,
            y: object.height
        }

        var _curStep = {
            x: 0,
            y: 0
        }
        var _animationList = object.sprite.animations.animationList;

        for (var a = 0; a < _animationList.length; a++) {
            var _animation = object.sprite.animations[_animationList[a]];
            var _loop = _animation.loop;

            for (var e = 0; e < _loop.length; e++) {
                var _frame = _animation.frames[_loop[e]];
                var _colors = _frame.length;

                var _yOffset = _curStep.y * _step.y;
                var _xOffset = _curStep.x * _step.x;

                for (var i = 0; i < _colors; i++) {
                    var _color = _frame[i][0];
                    _ctx.fillStyle = "rgb(" + _color + ")";

                    for (var o = 1; o < _frame[i].length; o++) {
                        var _coordY = _frame[i][o][0];

                        for (var u = 0; u < _frame[i][o][1].length; u++) {
                            var _coordX = _frame[i][o][1][u];

                            _ctx.fillRect(_coordX + _xOffset, _coordY + _yOffset, 1, 1);
                        }
                    }
                }
                _curStep.x++;
            }
            _curStep.y++;
            _curStep.x = 0;
        }
    }
    Game.prototype.newPoint = function(point, center, ang) {
        var _result = {
            x: center.x + (point.x - center.x) * Math.cos(ang) + (center.y - point.y) * Math.sin(ang),
            y: center.y + (point.y - center.y) * Math.cos(ang) + (point.x - center.x) * Math.sin(ang)
        }
        return _result;
    }
