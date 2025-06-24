import { add } from "../snippets/basic-functions/add";

describe('add', () => {
    it('Should return 3 with 1 and 2 as input', () => {
        // arrange
        const num1 = 1
        const num2 = 2

        // action
        const r = add(num1, num2)

        // assert 
        expect(add(1, 1)).toBe(2)
        expect(add(0, 0)).toBe(0)
        expect(add(-2, 1)).toBe(-1)
        expect(add(-2, -1)).toBe(-3)
        // expect(add).toHaveBeenCalledTimes(1)
    })

    it('Should return Infinity as result', () => {
        expect(add(Infinity, -1)).toBe(Infinity)
        expect(add(Infinity, Infinity)).toBe(Infinity)
        expect(add(Infinity, 10000)).toBe(Infinity)
        expect(add(Infinity, -100000)).toBe(Infinity)
    })

    it('should return NaN', () => {
        expect(add(Infinity, -Infinity)).toBeNaN();
    })

    //❌❌expect(add('abc' as any, 1)).toThrow(TypeError)❌❌
    //Error thrown escape before JEST can handle it
    it('should throw', () => {
        expect(() => add('abc', 1)).toThrow(TypeError);
        expect(() => add('abc', '11')).toThrow(TypeError);
        expect(() => add('123', Infinity)).toThrow(TypeError);
    })
})

/* 
- add is a pure function - given inputs, it returns an output without side effects

When is checking call count useful??
1. when the function calls other functions internally
    + caching
    + event handlers
    + mocks 
2. When testing side effects or interactions between modules.
3. When the function is a mock or spy itself and you want to ensure it was called the right number of times.
*/
