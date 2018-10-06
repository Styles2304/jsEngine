"use strict";

eDev.game.states.Boot.prototype = {
    g: eDev.game,
    start: function() { console.log("Boot State"); },
    init: function() {},
    update: function() {
        this.g.startState("Game");
    },
    draw: function() {}
}