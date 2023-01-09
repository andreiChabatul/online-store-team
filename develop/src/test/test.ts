import { StateMain } from "../State/State";

const stateTest = new StateMain();



describe('setSort method', () => {
  test('Should return sort', () => {
      ['price-asc', 'price-desc', 'rating-asc', 'rating-desc', 'discont-asc', 'discont-desc'].forEach((element) => {
          stateTest.setSort(element)
          const data = stateTest.getSort();
          expect(data).toBe(element);
      });
  });
});