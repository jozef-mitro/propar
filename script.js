class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 10;
        this.target = {x: 0, y: 0};
    }

    update(InputHandler) {
        if (InputHandler.keys['w']) this.y -= 1;
        if (InputHandler.keys['s']) this.y += 1;
        if (InputHandler.keys['a']) this.x -= 1;
        if (InputHandler.keys['d']) this.x += 1;
        this.target.x = InputHandler.mouseX;
        this.target.y = InputHandler.mouseY;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        // Draw a line from the player to the mouse pointer.
        ctx.beginPath();
        ctx.moveTo(this.x + this.size / 2, this.y + this.size / 2);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
        ctx.closePath();
    }
}

class InputHandler {
    constructor(canvasRect) {
        this.canvasRect = canvasRect;
        this.keys = {};
        this.mouse = {};
        this.mouseX = 0;
        this.mouseY = 0;

        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        document.addEventListener('mousedown', (e) => {
            this.mouse[e.button] = true;
        });
        document.addEventListener('mouseup', (e) => {
            this.mouse[e.button] = false;
        });
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX - this.canvasRect.left;
            this.mouseY = e.clientY - this.canvasRect.top;
        });
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.ctx = this.canvas.getContext('2d');
        this.inputHandler = new InputHandler(this.canvas.getBoundingClientRect());
        this.player = new Player();
    }

    update() {
        this.player.update(this.inputHandler);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

const game = new Game();
game.loop();