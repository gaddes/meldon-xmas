import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault(); // Stop form from submitting itself - we want to take over this functionality with JavaScript (vs. allowing the browser to do this)
    axios
        .post(this.action)
        .then(res => {
            // Update colour of store heart icon depending on whether it is hearted
            const isHearted = this.heart.classList.toggle('heart__button--hearted');
            // Update number associated with heart icon on navbar
            $('.heart-count').textContent = res.data.hearts.length;
            // Fun floaty functionality
            if (isHearted) {
                this.heart.classList.add('heart__button--float');
                setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500);
            }
        })
        .catch(console.error);
}

export default ajaxHeart;