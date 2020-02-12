let canvas;
let context;
let player;
let residues;

// change these to customize
const boxSize = 2;
const areaWidth = 320;
const areaHeight = 200;

const canvasHeight = boxSize * areaHeight;
const canvasWidth = boxSize * areaWidth;

class Drawable {
    constructor(x = 0, y = 0, color = '#FFFFFF') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x * boxSize, this.y * boxSize, boxSize, boxSize);
        return;
    }
}

class Player extends Drawable {
    constructor(x, y) {
        super(x, y);
    }

    step() {
        switch (randN(4)) {
            case 0:
                this.x += 1;
                break;
            case 1:
                this.y += 1;
                break;
            case 2:
                this.y -= 1;
                break;
            default:
                this.x -= 1;
        }

        if (this.x > areaWidth) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = areaWidth - 1;
        } 
        if (this.y < 0) {
            this.y = areaHeight - 1;
        } else if (this.y > areaHeight) {
            this.y = 0;
        }
    }
}

class Residue extends Drawable {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.color = '#000000';
        this.life = 17432;
        return;
    }

    isAlive() {
        this.life--;
        return this.life > 0;
    }
}

player = new Player(areaWidth / 2, areaHeight / 2);
residues = [];

let clear = () => context.clearRect(0, 0, canvasWidth, canvasHeight);
let randN = (N) => Math.floor((Math.random() * N));

function loop() {
    clear();

    player.step();

    residues.push(new Residue(player.x, player.y));
    residues = residues.filter(r => r.isAlive());
    residues.forEach(r => r.draw());

    player.draw();

    return;
}

function startGame(c) {
    canvas = c;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");

    window.setInterval(loop, 25);
    return;
}

export { startGame };