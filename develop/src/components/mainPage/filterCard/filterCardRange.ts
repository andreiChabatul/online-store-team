import State from '../../../State/State';
import { IComponentUpdate } from '../../../types/index';
import { createFilterNumber, setFilterNumber } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import './filterCardRange.css';

export default class FilterCardRange implements IComponentUpdate {
    inputOne: HTMLInputElement;
    inputTwo: HTMLInputElement;
    change: number[];
    valuesMin: HTMLSpanElement;
    valuesMax: HTMLSpanElement;
    element: HTMLDivElement;
    valuesEmpty: HTMLDivElement;
    filterArr: number[];
    category: 'stock' | 'price';

    constructor(filterArr: number[], category: 'stock' | 'price') {
        this.filterArr = filterArr;
        this.category = category;
        State.getFilterNumber(this.category).length === 0
            ? (this.change = createFilterNumber(State.getData(), this.category))
            : (this.change = State.getFilterNumber(this.category));
        this.element = CreateElement.createDivElement('wrapper-range');
        this.valuesMin = CreateElement.createSpanElement('filter-container-values__min', this.change[0]);
        this.valuesMax = CreateElement.createSpanElement('filter-container-values__max', this.change[1]);
        this.inputOne = CreateElement.createInputElement(
            'filter-container-range__input-one',
            '',
            this.category,
            'range',
            this.change[0]
        );
        this.inputTwo = CreateElement.createInputElement(
            'filter-container-range__input-two',
            '',
            this.category,
            'range',
            this.change[1]
        );
        this.valuesEmpty = CreateElement.createDivElement('container-values__empty', '', 'No founds');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        const containerValues = CreateElement.createDivElement('filter-container-values');
        const valuesLine = CreateElement.createSpanElement('filter-container-values__line', '⟷');
        const containerRange = CreateElement.createDivElement('filter-container-range');
        const sliderTrack = CreateElement.createDivElement('filter-container-range__track');
        const minGap = 5;
        this.inputOne.setAttribute('min', String(this.filterArr[0]));
        this.inputOne.setAttribute('max', String(this.filterArr[1]));
        this.inputTwo.setAttribute('min', String(this.filterArr[0]));
        this.inputTwo.setAttribute('max', String(this.filterArr[1]));
        this.inputOne.setAttribute('value', String(this.change[0]));
        this.inputTwo.setAttribute('value', String(this.change[1]));
        this.inputOne.addEventListener('input', () => sliderOne(this.inputOne, this.inputTwo, this.valuesMin));
        this.inputTwo.addEventListener('input', () => sliderTwo(this.inputOne, this.inputTwo, this.valuesMax));
        function sliderOne(inputOne: HTMLInputElement, inputTwo: HTMLInputElement, valuesMin: HTMLSpanElement) {
            parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap
                ? (inputOne.value = String(parseInt(inputTwo.value) - minGap))
                : '';
            valuesMin.textContent = inputOne.value;
            inputOne.id === 'price' || inputOne.id === 'stock'
                ? setFilterNumber(inputOne.id, `${inputOne.value}%E2%86%95${inputTwo.value}`)
                : '';
        }

        function sliderTwo(inputOne: HTMLInputElement, inputTwo: HTMLInputElement, valuesMax: HTMLSpanElement) {
            parseInt(inputTwo.value) - parseInt(inputOne.value) <= minGap
                ? (inputTwo.value = String(parseInt(inputOne.value) + minGap))
                : '';
            valuesMax.textContent = inputTwo.value;
            inputTwo.id === 'price' || inputTwo.id === 'stock'
                ? setFilterNumber(inputTwo.id, `${inputOne.value}%E2%86%95${inputTwo.value}`)
                : '';
        }

        containerValues.append(this.valuesMin, valuesLine, this.valuesMax);
        containerRange.append(sliderTrack, this.inputOne, this.inputTwo);
        result.push(this.valuesEmpty, containerValues, containerRange);
        this.update();
        return result;
    }

    fill() {
        this.render().forEach((element) => {
            this.element.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.element;
    }

    update() {
        State.getFilterNumber(this.category).length === 0
            ? (this.change = createFilterNumber(State.getData(), this.category))
            : (this.change = State.getFilterNumber(this.category));
        this.inputOne.setAttribute('value', String(this.change[0]));
        this.inputTwo.setAttribute('value', String(this.change[1]));
        this.valuesMin.textContent = this.inputOne.value;
        this.valuesMax.textContent = this.inputTwo.value;
        this.inputOne.value === this.inputTwo.value
            ? this.valuesEmpty.classList.add('container-values__empty_active')
            : this.valuesEmpty.classList.remove('container-values__empty_active');
    }
}
