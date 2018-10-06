"use strict";
//=======================================================//
// World Class
//=======================================================//
    let World = function(key, x, y, width, height) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cells = [];
        this.debug = false;

        this.addCell(0, 0, this.width, this.height);
        this.currentCell = 0;
    }

    World.prototype.debugWorld = function() {
        this.debug = true;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");

        for(var a = 0; a < this.cells.length; a++) {
            this.ctx.strokeStyle = "rgb(0,255,0)";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.cells[a].x, this.cells[a].y, this.cells[a].width, this.cells[a].height);
            this.ctx.stroke();
        }

        this.ctx.strokeStyle = "rgb(0,0,255)";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
    }

    World.prototype.addCell = function(x, y, width, height) {
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
