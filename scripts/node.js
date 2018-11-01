/**
 * A node for a snake or a pellet
 */
class Node {
    constructor(x, y, width, className) {
        this.div = document.createElement('div');
        this.div.className = className;
        this.div.style.position = 'relative';
        this.div.style.top = x + 'px';
        this.div.style.left = y + 'px';
        this.div.style.width = width + 'px';
        this.div.style.height = width + 'px';
        document.getElementById('board').appendChild(this.div);
    }
}