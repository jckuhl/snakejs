/**
 * Game board that maintains entire gameplay
 */
class Board {

    constructor(selector, gridWidth) {
        this.gridWidth = gridWidth;
        this.board = document.querySelector(selector);
        this.bounds = this.board.getBoundingClientRect();
        this.coords = this.getCoordinateArray();
        this.pellet = null;
        this.snake = null;
        this.score = new Score(this.bounds.left, this.bounds.top);
    }

    /**
     * Generates all valid coordinates for pellet and snake spawn
     * @returns {[{number, number}]}
     */
    getCoordinateArray() {
        if(!this.board) {
            throw new Error('Board not found');
        }
        let x = 0, y = 0;
        // console.log(x, y, this.bounds);
        let coords = [{ x, y }];
        while(y < this.bounds.height) {
            while(x < this.bounds.width) {
                x += this.gridWidth;
                // new Snake(x, y, 16);
                coords.push({x, y});
            }
            y += this.gridWidth;
            x = 0;
        }
        console.log(coords);
        return coords;
    }

    /**
     * Starts the game, managing game state and the game loop
     */
    async start() {
        let gameLoop;

        const pointsOnBoundary = p => p.x < this.bounds.width && p.y < this.bounds.height;
        const random = (len)=> Math.floor(Math.random() * len);

        let position = {
            x: 0, y: 0
        };

        const filteredCoords = this.coords.filter(pointsOnBoundary);

        let {x, y} = filteredCoords[random(filteredCoords.length)];
        this.snake = new Snake(y, x, 16);

        /**
         * Runs the game loop.  Is used as a call back in new Promise.
         * @param {Function} resolve resolve function passed by new Promise
         */
        const startAnimation = (resolve)=> {
            
            // if the snake is dead, kill the loop and resolve the promise
            if(!this.snake || !this.snake.alive) {
                cancelAnimationFrame(gameLoop);
                resolve('Game Over');
                return;
            }

            // if there isn't a pellet on screen, draw a new one at a random coordinate
            if(!this.pellet) {
                // grab a random x, y from any point where the circle won't be drawn off the board
                let {x, y} = filteredCoords[random(filteredCoords.length)];
                this.pellet = new Pellet(x, y, 16);
            }

            // incremend speed by the snake's speed object
            position.x += this.snake.speed.x;
            position.y += this.snake.speed.y;

            // set the new values to the style object
            this.snake.div.style.top = position.y + 'px';
            this.snake.div.style.left = position.x + 'px';

            // set the new values to the style object of each tail node
            let offset = 16;

            // TODO: TOTAL REWRITE OF TAIL MOVEMENT, might take me a while to think of a solution
            // what I need is chasing behavior
            const calculateOffset = (dir, offset) => {
                const DIR = {
                    up: ()=> ({ x: -offset, y: 0}),
                    down: ()=> ({ x: offset, y: 0}),
                    left: ()=> ({ x: 0, y: -offset }),
                    right: ()=> ({ x: 0, y: offset })
                }
                return DIR[dir]();
            }

            // for every tail node, update position so it follows the head.
            this.snake.tail.forEach(node => {
                let offsetPosition = calculateOffset(this.snake.dir, offset);
                node.div.style.top = position.y + offsetPosition.y + 'px';
                node.div.style.left = position.x + offsetPosition.x + 'px';
                offset += 16;
            });

            // check for collision with pellet, self, and game edge
            this.snake.detectPellet(this.pellet);
            this.snake.detectEdge(this.bounds.width, this.bounds.height);

            // check the pellet's touched property, if true, destroy it so a new one can be made
            if(this.pellet.touched) {
                this.board.removeChild(this.pellet.div);
                this.pellet = null;
            }

            // maintain the current score
            this.score.setScore(this.snake.score);

            // recurse the RAF, pass resolve into the startAnimation function
            gameLoop = requestAnimationFrame(()=> startAnimation(resolve));
        }

        // call startAnimation as a promise so we can do endgame clean up
        const endgame = await new Promise(startAnimation).then(endgame => endgame);

        // create the end game message
        const gameOverDiv = document.createElement('div');
        gameOverDiv.id = 'game-over';
        gameOverDiv.innerHTML = `
            <p>${endgame}</p>
            <p><small>Your score was ${this.score.score}</small></p>
        `;
        this.board.appendChild(gameOverDiv);
    }

}

const board = new Board('#board', 16);
board.start();