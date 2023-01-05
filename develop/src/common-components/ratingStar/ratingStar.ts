import CreateElement from '../../utils/CreateElement';
import './ratingStar.css';
import ratingImg from '../../assets/img/rating.png';

export default class RatingStar {
    rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }

    render() {
        const ratingContainer = CreateElement.createDivElement('rating__container');
        const starImg = CreateElement.createImgElement('rating__img', ratingImg);
        const ratingOne = CreateElement.createDivElement('rating__one');
        const ratingText = CreateElement.createParagraphElement('rating__text', this.rating);
        ratingOne.style.width = (this.rating / 5) * 75 + 'px';
        ratingContainer.append(ratingOne, starImg, ratingText);
        return ratingContainer;
    }
}
