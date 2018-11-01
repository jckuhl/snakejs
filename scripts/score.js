/**
 * Displays a score
 */
class Score {
    constructor(x, y) {
        this.score = 0;
        this.div = document.createElement('div');
        this.bounds = this.div.getBoundingClientRect();
        this.div.className = 'score';
        this.div.style.top = y + 'px';
        this.div.style.left = (x + this.bounds.width) + 'px';
        this.div.style.position = 'absolute';
        this.div.innerHTML = this.score;
        document.getElementById('board').appendChild(this.div);
    }

    /**
     * Sets and displays the score
     * @param {number} score 
     */
    setScore(score) {
        this.div.innerHTML = this.score = score;
    }
}