/**
 * Displays a score
 */
class Score {
    constructor(x, y) {
        this.score = 0;
        this.div = document.createElement('div');
        document.getElementById('board').appendChild(this.div);
        this.bounds = this.div.getBoundingClientRect();
        this.div.className = 'score';
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        this.div.style.position = 'absolute';
        this.div.innerHTML = this.score;
    }

    /**
     * Sets and displays the score
     * @param {number} score 
     */
    setScore(score) {
        this.div.innerHTML = this.score = score;
    }
}