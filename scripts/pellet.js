class Pellet extends Node {
    constructor(x, y, width) {
        super(x, y, width, 'pellet-node');
        this.touched = false;
    }
}