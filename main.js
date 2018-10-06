"use strict";

// Create game
let eDev = {};
eDev.game = new Game("gameCanvas", "gameContainer", 800, 600, 30);

// States
eDev.game.addState("Boot", ["start", "init"], ["update", "draw"]);
eDev.game.addState("Game", ["start", "init"], ["update", "draw"]);

// Start State
eDev.game.startState("Boot");