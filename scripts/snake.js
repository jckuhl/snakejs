/**
 * Tail nodes.  Follows the head
 */
class Tail extends Node {
    constructor(x, y, width) {
        super(x, y, width, 'snake-node');
    }
}

/**
 * Snake class, or more accurately, the head node.  Controls the movement of the snake and its tail.
 */
class Snake extends Node {
    constructor(x, y, width) {
        super(x, y, width, 'snake-node');
        this.alive = true;
        this.velocity = 1;
        this.tail = [];
        this.score = 0;

        // initial speed is zero in all directions
        this.speed = {
            x: 0, y: 0
        };

        // available movements
        this.MOVEMENTS = {
            ArrowUp: (vel)=> ({ x: 0, y: -vel }),
            ArrowDown: (vel)=> ({ x: 0, y: vel }),
            ArrowLeft: (vel)=> ({ x: -vel, y: 0 }),
            ArrowRight: (vel)=> ({ x: vel, y: 0 }),
            // TODO: spacebar is just a pause, right now it's used to kill the snake, remove kill function
            Space: (vel)=> {
                // if(x != 0 || y != 0) {
                //     return { x: 0, y: 0};
                // }
                this.alive = false;
            }
        }

        // add the event listener to move
        document.addEventListener('keyup', this.move.bind(this));

        // disable movement with arrow keys
        document.addEventListener('keydown', this.disableScroll.bind(this));
    }

    move(event) {
        if(Object.getOwnPropertyNames(this.MOVEMENTS).includes(event.code)) {
            this.speed = this.MOVEMENTS[event.code](this.velocity);
        }
    }

    /**
     * Allows the snake to detect a pellet, consuming it and growing the snake
     * @param {Pellet} pellet 
     */
    detectPellet(pellet) {

        // distance formula d = sqrt((x1 - x2) + (y1 - y2))
        const distance = (a,b,x,y) => {
            return Math.sqrt(Math.pow(a-x,2) + Math.pow(b-y,2));
        }

        // find the center point of the circle, given top and left properties of the element and its radius
        const getCenter = (elem, radius) => {
            return { x: parseInt(elem.style.left) - radius, y: parseInt(elem.style.top) - radius };
        }

        // find the radii
        let pelletRadius = parseInt(pellet.div.style.width) / 2;
        let snakeRadius = parseInt(this.div.style.width) / 2;

        // find the centers and the distance between those centers
        let pelletCenter = getCenter(pellet.div, pelletRadius);
        let snakeCenter = getCenter(this.div, snakeRadius);
        let dist = distance(snakeCenter.x, snakeCenter.y, pelletCenter.x, pelletCenter.y);

        // check if they are touching (distance to center less than the sum of their radii)
        // then mark pellet as touched, increase velocity, add a tail node and increment the score
        if(dist < (snakeRadius + pelletRadius) + 5) {
            pellet.touched = true;
            this.velocity += 0.1;
            this.tail.push(new Tail(parseInt(this.div.style.left), parseInt(this.div.style.top) - 16, 16));
            this.score += 1;
        }

    }

    /**
     * Detects the edge of the board and kills the snake if it crosses.
     * @param {string} width board's dimensions
     * @param {string} height board's dimensions
     */
    detectEdge(width, height) {
        let isTooFarLeft = parseInt(this.div.style.left) < 0;
        let isTooFarRight = parseInt(this.div.style.left) > width;
        let isTooFarUp = parseInt(this.div.style.top) < 0;
        let isTooFarDown = parseInt(this.div.style.top) > height;

        if(isTooFarUp || isTooFarDown || isTooFarRight || isTooFarLeft) {
            this.alive = false;
        }
    }

    /**
     * Disables scrolling on all keyboard events the game uses
     * @param {Event} event 
     */
    disableScroll(event) {
        if(Object.getOwnPropertyNames(this.MOVEMENTS).includes(event.code)) {
            event.preventDefault();
        }
    }
}