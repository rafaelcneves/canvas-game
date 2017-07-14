/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var raquete_1 = __webpack_require__(2);
var bola_1 = __webpack_require__(3);
var tijolo_1 = __webpack_require__(4);
var Main = (function () {
    function Main() {
        this.keyMap = {};
        this.state = 0;
        this.score = 0;
        this.hiscore = 0;
        var canvas = document.getElementById('game');
        this.context = canvas.getContext('2d');
        this.player = new raquete_1.Raquete(150, 580, 100, 10, this.context);
        this.ball = new bola_1.Bola(200, 570, 10, this.context);
        this.bricks = [
            new tijolo_1.Tijolo(10, 10, 50, 10, this.context),
            new tijolo_1.Tijolo(62, 10, 50, 10, this.context),
            new tijolo_1.Tijolo(114, 10, 50, 10, this.context),
            new tijolo_1.Tijolo(166, 10, 50, 10, this.context),
            new tijolo_1.Tijolo(30, 22, 50, 10, this.context),
            new tijolo_1.Tijolo(82, 22, 50, 10, this.context),
            new tijolo_1.Tijolo(134, 22, 50, 10, this.context),
            new tijolo_1.Tijolo(186, 22, 50, 10, this.context)
        ];
        this.hiscore = parseInt(localStorage.getItem('hiscore'));
    }
    Main.prototype.start = function () {
        var _this = this;
        this.timer = setInterval(function () { _this.mainloop(); }, 33);
    };
    Main.prototype.mainloop = function () {
        var _this = this;
        if (this.keyMap[37] == true) {
            this.player.move(-2);
        }
        if (this.keyMap[39] == true) {
            this.player.move(2);
        }
        if (this.keyMap[32] == true && this.state == 0) {
            this.state = 1;
        }
        if (this.state == 1) {
            this.ball.move();
        }
        this.ball.detectColision();
        this.bricks.forEach(function (brick, i) {
            if (brick.detectColisionBrickxBall(_this.ball)) {
                _this.bricks.splice(i, 1);
                if (_this.bricks.length == 0) {
                    _this.state = 3;
                    _this.updateHiscore();
                }
            }
        });
        this.paint();
    };
    Main.prototype.paint = function () {
        this.context.clearRect(0, 0, 400, 600);
        this.player.paint();
        this.ball.paint();
        this.bricks.forEach(function (brick) { return brick.paint(); });
        this.context.font = '18pt monospace';
        switch (this.state) {
            case 0:
                this.context.fillText('Aperte ESPACO para iniciar', 12, 295);
                break;
            case 1:
                this.context.fillText(this.score.toString(), 350, 595);
                break;
            case 2:
                this.context.fillText('Fim de Jogo', 125, 295);
                break;
            case 3:
                this.context.fillText('Voce venceu', 125, 295);
                break;
        }
        this.context.fillText('Hi-Score', 5, 575);
        this.context.fillText(this.hiscore.toString(), 5, 595);
    };
    Main.prototype.updateHiscore = function () {
        if (this.score > this.hiscore) {
            this.hiscore = this.score;
            localStorage.setItem('hiscore', this.score.toString());
        }
    };
    Main.prototype.onKeyDown = function (e) {
        this.keyMap[e.keyCode] = true;
    };
    Main.prototype.onKeyUp = function (e) {
        this.keyMap[e.keyCode] = false;
    };
    Main.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };
    Main.prototype.detectarColisaoRaquetexBola = function () {
        var xMaisProximo = Main.clamp(this.ball.x, this.player.x, (this.player.x + this.player.width));
        var yMaisProximo = Main.clamp(this.ball.y, this.player.y, (this.player.y + this.player.height));
        var distanciaX = this.ball.x - xMaisProximo;
        var distanciaY = this.ball.y - yMaisProximo;
        var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);
        return distancia < (this.ball.radius * this.ball.radius);
    };
    return Main;
}());
exports.Main = Main;
window.onload = function () {
    window['main'] = new Main();
    window['main'].start();
    window.onkeydown = function (e) {
        window['main'].onKeyDown(e);
    };
    window.onkeyup = function (e) {
        window['main'].onKeyUp(e);
    };
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SoundEffects = (function () {
    function SoundEffects() {
    }
    SoundEffects.playBlop = function () {
        this.soundEffects[0].play();
    };
    SoundEffects.playMirrorBreaking = function () {
        this.soundEffects[1].play();
    };
    SoundEffects.soundEffects = [
        new Audio('Blop.mp3'),
        new Audio('MirrorBreaking.mp3')
    ];
    return SoundEffects;
}());
exports.SoundEffects = SoundEffects;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Raquete = (function () {
    function Raquete(x, y, width, height, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
    }
    Raquete.prototype.paint = function () {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    };
    Raquete.prototype.move = function (dx) {
        this.x += dx;
    };
    return Raquete;
}());
exports.Raquete = Raquete;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sound_effects_1 = __webpack_require__(1);
var Bola = (function () {
    function Bola(x, y, radius, context) {
        this.dirX = (Math.random() > 0.5) ? 3 : -3;
        this.dirY = -3;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
    }
    Bola.prototype.paint = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    };
    Bola.prototype.move = function () {
        this.x += this.dirX;
        this.y += this.dirY;
    };
    Bola.prototype.invertX = function () {
        this.dirX *= -1;
    };
    Bola.prototype.invertY = function () {
        this.dirY *= -1;
    };
    Bola.prototype.detectColision = function () {
        if ((this.x - this.radius) <= 0 || (this.x + this.radius) >= 400) {
            this.invertX();
            sound_effects_1.SoundEffects.playBlop();
        }
        if ((this.y - this.radius) <= 0 || window['main'].detectarColisaoRaquetexBola()) {
            this.invertY();
            sound_effects_1.SoundEffects.playBlop();
        }
        if ((this.y - this.radius) >= 600) {
        }
    };
    ;
    return Bola;
}());
exports.Bola = Bola;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(0);
var sound_effects_1 = __webpack_require__(1);
var Tijolo = (function () {
    function Tijolo(x, y, width, height, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
    }
    Tijolo.prototype.paint = function () {
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = '#555555';
        this.context.strokeRect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = '#000000';
    };
    Tijolo.prototype.detectColisionBrickxBall = function (ball) {
        var xMaisProximo = main_1.Main.clamp(ball.x, this.x, (this.x + this.width));
        var yMaisProximo = main_1.Main.clamp(ball.y, this.y, (this.y + this.height));
        var distanciaX = ball.x - xMaisProximo;
        var distanciaY = ball.y - yMaisProximo;
        var distancia = (distanciaX * distanciaX) + (distanciaY * distanciaY);
        if (distancia < (ball.radius * ball.radius)) {
            if (ball.x > this.x && ball.x < (this.x + this.width)) {
                ball.invertY();
            }
            else if (ball.y > this.y && ball.y < (this.y + this.height)) {
                ball.invertX();
            }
            else {
                ball.invertY();
                ball.invertX();
            }
            sound_effects_1.SoundEffects.playMirrorBreaking();
            return true;
        }
        return false;
    };
    return Tijolo;
}());
exports.Tijolo = Tijolo;


/***/ })
/******/ ]);