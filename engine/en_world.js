"use strict";
//=======================================================//
// World Class
//=======================================================//
    let World = function(key, x, y, width, height, game) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.center = {
            x: Math.round(this.width / 2),
            y: Math.round(this.height / 2)
        }
        this.cells = [];
        this.sprites = [];
        this.debug = false;
        this.camera = {
            enabled: false,
            follow: null,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            world: {
                x: 0,
                y: 0
            }
        }

        this.addCell(0, 0, this.width, this.height);
    }
    World.prototype.debugWorld = function() {
        this.debug = true;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");

        for(var a = 0; a < this.cells.length; a++) {
            this.ctx.strokeStyle = "rgb(0,255,0)";
            this.ctx.strokeRect(this.cells[a].x, this.cells[a].y, this.cells[a].width, this.cells[a].height);
        }

        this.ctx.strokeStyle = "rgb(255,0,0)";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.camera.x + 5, this.camera.y + 5, this.camera.width - 10, this.camera.height - 10);

        this.ctx.strokeStyle = "rgb(0,0,255)";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
    }
    World.prototype.addCell = function(x, y, width, height) {   // Unnecessary?
        var _key = this.cells.length;
        this.cells.push(new Cell(_key, x, y, width, height));
    }
    World.prototype.createCells = function(width, height) {
        this.cells = Array();

        for (var a = 0; a < this.height; a = a + height) {
            for (var e = 0; e < this.width; e = e + width) {
                this.addCell(e, a, width, height);
            }
        }
    }
    World.prototype.addSprite = function(type, x, y, width, height, fps) {
        this.sprites.push(new type(x, y, width, height, fps));
        this.sprites[this.sprites.length - 1].currentWorld = this;

        return this.sprites[this.sprites.length - 1];
    }
    World.prototype.resize = function(width, height) {
        // Update values
        this.width = width;
        this.height = height;
        this.center = {
            x: Math.round(this.width / 2),
            y: Math.round(this.height / 2)
        }
    }
    World.prototype.enableCamera = function(enable, x, y, width, height, worldX, worldY, follow) {
        this.camera.enabled = enable;
        this.camera.width = width;
        this.camera.height = height;
        this.camera.x = x;
        this.camera.y = y;
        this.camera.world.x = worldX;
        this.camera.world.y = worldY;
        this.camera.follow = follow;
    }

//=======================================================//
// Cell Class
//=======================================================//
    let Cell = function(key, x, y, width, height) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
