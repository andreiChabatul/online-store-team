import { POP_UP } from "../CONST/const";
import { StateMain } from "../State/State";
import { IPagination, IProduct } from "../types/index";
import CreateElement from "../utils/CreateElement";

const product: IProduct = {
  id: 1,
  title: 'test',
  description: 'test',
  price: 1000,
  discountPercentage: 10,
  rating: 1,
  stock: 1,
  brand: 'test',
  category: 'test',
  thumbnail: 'test',
  images: [],
};

const stateTest = new StateMain();
const carts: IProduct[] = [];
const testElement: HTMLElement[] = [];
carts.length = 10;
carts.fill(product);
for (let i = 0; i < 10; i++) {
  testElement.push(CreateElement.createParagraphElement('test', `test-text-${i}`, `testId-${i}`))
}


describe('Check set id and text function createElement', () => {
  test('Should return ID', () => {
    testElement.forEach((element, i) => {
      const ID = element.id;
      const text = element.textContent;
      expect(text).toBe(`test-text-${i}`);
      expect(ID).toBe(`testId-${i}`);
    });
  });
});

describe('Check set and get sort at State', () => {
  test('Should return sort', () => {
    ['price-asc', 'price-desc', 'rating-asc', 'rating-desc', 'discont-asc', 'discont-desc'].forEach((element) => {
      stateTest.setSort(element)
      const data = stateTest.getSort();
      expect(data).toBe(element);
    });
  });
});

describe('Check get Data method at State', () => {
  test('Should return length data', () => {
    stateTest.setData(carts);
    const data = stateTest.getData();
    expect(data).toHaveLength(10);
  });
});

describe('Check set select page pagination main at State', () => {
  test('Should return select page', () => {
    [4, 6, 3, 43, 65, 1, 43, 54, 3, 43, 43, 43, 43, 34].forEach((page) => {
      stateTest.setSelectPage(String(page));
      expect(stateTest).toHaveProperty('pagination.selectPage', page);
    });
  });
});

describe('Check get amount page pagination main at State', () => {
  test('Should return amount page', () => {
    ['1', '2', '3', '4', '5', '6', '7', '9', '10'].forEach((amount) => {
      stateTest.setSelectAmount(amount);
      const amountPage = stateTest.getAmountPage();
      const data = Math.ceil(10 / Number(amount));
      expect(data).toBe(amountPage);
    });
  });
});

describe('Check stateTest is an instance of class State', () => {
  test('Should stateTest is an instance of class State', () => {
    expect(stateTest).toBeInstanceOf(StateMain);
  });
});

describe('Check validation Pop_up', () => {
  test('Should return validation', () => {
    expect('grapefruitsmail.ru').not.toMatch(new RegExp(POP_UP[3].regEx));
    expect('grapefruits@mail').not.toMatch(new RegExp(POP_UP[3].regEx));
    expect('grapefruits@mail.ru').toMatch(new RegExp(POP_UP[3].regEx));
    expect('andrei chabatul').toMatch(new RegExp(POP_UP[0].regEx));
    expect('andreichabatul').not.toMatch(new RegExp(POP_UP[0].regEx));
  });
});