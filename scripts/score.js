/**
 * Displays a score
 */
class Score {
    constructor(x, y) {
        this.score = 0;
        this.div = document.createElement('div');
        this.div.className = 'score';
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        this.div.style.position = 'relative';
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