import { CHANGE_USER_INPUT } from '../constants';

import { changeUsername } from '../actions';

describe('Home Actions', () => {
  describe('changeUserInput', () => {
    it('should return the correct type and the passed input', () => {
      const fixture = 'Sample';
      const expectedResult = {
        type: CHANGE_USER_INPUT,
        input: fixture,
      };
      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
    describe('changeUserInput', () => {
      it('should handle input with spaces', () => {
        const fixture = 'Sample Input';
        const expectedResult = {
          type: CHANGE_USER_INPUT,
          input: fixture,
        };
        expect(changeUsername(fixture)).toEqual(expectedResult);
      });
    });
    describe('changeUserInput', () => {
      it('should handle numeric input', () => {
        const fixture = 12345;
        const expectedResult = {
          type: CHANGE_USER_INPUT,
          input: fixture,
        };
        expect(changeUsername(fixture)).toEqual(expectedResult);
      });
    });
});
