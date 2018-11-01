class Snake extends Node {
    constructor(x, y, width) {
        super(x, y, width, 'snake-node');
        this.alive = true;
        this.speed = {
            x: 0, y: 0
        };

        // available movements
        this.MOVEMENTS = {
            ArrowUp: (vel)=> ({ x: 0, y: -vel }),
            ArrowDown: (vel)=> ({ x: 0, y: vel }),
            ArrowLeft: (vel)=> ({ x: -vel, y: 0 }),
            ArrowRight: (vel)=> ({ x: vel, y: 0 }),
            Space: (vel)=> {
                if(x != 0 || y != 0) {
                    return { x: 0, y: 0};
                }
            }
        }

        // add the event listener to move
        document.addEventListener('keyup', this.move.bind(this));

        // disable movement with arrow keys
        document.addEventListener('keydown', this.disableScroll.bind(this));
    }

    move(event) {
        if(Object.getOwnPropertyNames(this.MOVEMENTS).includes(event.code)) {
            this.speed = this.MOVEMENTS[event.code](1);
        }
    }

    detectPellet(pellet) {
        const distance = (a,b,x,y) => {
            return Math.sqrt(Math.pow(a-x,2) + Math.pow(b-y,2));
        }

        const getCenter = (elem, radius) => {
            return { x: parseInt(elem.style.left) - radius, y: parseInt(elem.style.top) - radius };
        }

        let pelletRadius = parseInt(pellet.div.style.width) / 2;
        let snakeRadius = parseInt(this.div.style.width) / 2;

        let pelletCenter = getCenter(pellet.div, pelletRadius);
        let snakeCenter = getCenter(this.div, snakeRadius);
        let dist = distance(snakeCenter.x, snakeCenter.y, pelletCenter.x, pelletCenter.y);

        console.log(dist);

        if(dist < (snakeRadius + pelletRadius) + 5) {
            console.log('eat the pellet!');
        }

    }

    disableScroll(event) {
        if(Object.getOwnPropertyNames(this.MOVEMENTS).includes(event.code)) {
            event.preventDefault();
        }
    }
}