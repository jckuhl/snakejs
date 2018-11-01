class Board {

    constructor(selector) {
        this.board = document.querySelector(selector);
        this.bounds = this.board.getBoundingClientRect();
        this.coords = this.getCoordinateArray();
        this.pellet = null;
        this.snake = null;
    }

    getCoordinateArray() {
        if(!this.board) {
            throw new Error('Board not found');
        }
        let x = 0, y = 0;
        let coords = [{ x, y }];
        while(y < this.bounds.height) {
            while(x < this.bounds.width) {
                x += 16;
                coords.push({x, y});
            }
            y += 16;
            x = 0;
        }
        return coords;
    }

    start() {
        let speed = {
            x: 0, y: 0
        };
        const startAnimation = ()=> {
            const pointsOnBoundary = p => p.x != this.bounds.width || p.y != this.bounds.width;
            const random = (len)=> Math.floor(Math.random() * len);
            if(!this.pellet) {
                let {x, y} = this.coords.filter(pointsOnBoundary)[random(this.coords.length)];
                this.pellet = new Pellet(x, y, 16);
            }
            if(!this.snake) {
                let {x, y} = this.coords.filter(pointsOnBoundary)[random(this.coords.length)];
                this.snake = new Snake(x, y, 16);
            }
            speed.x += this.snake.speed.x;
            speed.y += this.snake.speed.y;
            this.snake.div.style.top = speed.y + 'px';
            this.snake.div.style.left = speed.x + 'px';

            this.snake.detectPellet(this.pellet);
            if(this.pellet.touched) {
                this.board.removeChild(this.pellet.div);
                this.pellet = null;
            }
            // console.log(speed);
            const gameLoop = requestAnimationFrame(startAnimation);
            // if(!this.snake || !this.snake.health) {
            //     cancelAnimationFrame(gameLoop);
            // }
        }
        startAnimation();
    }

}

const board = new Board('#board');
board.start();