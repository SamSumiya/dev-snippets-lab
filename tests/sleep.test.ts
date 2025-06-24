import { sleep } from "../snippets/promise/sleep";

describe('sleep', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers() 
    })

    it('1 should resolve after 500ms pause', async () => {
        // Arrange 
        const delayMS = 500

        // Act
        const resultPromise = sleep(delayMS)
        jest.advanceTimersByTime(500)

        //Assert
        await expect(resultPromise).resolves.toBeUndefined()
    })

    it('2 should not resolve if timer not advanced', async() => {
        const mockFn = jest.fn()
        sleep(500).then(mockFn)
        
        expect(mockFn).not.toHaveBeenCalled()
    })

    it('3 should resolve immediately with 0ms delay', async() => {
        const resultPromise = sleep(0)
        jest.advanceTimersByTime(0)
        await expect(resultPromise).resolves.toBeUndefined()
    })

    it('4 should allow concurrent sleep', async() => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()

        sleep(1).then(fn1)
        sleep(300).then(fn2)

        jest.advanceTimersByTime(1)
        await Promise.resolve();
        expect(fn1).toHaveBeenCalledTimes(1)
        expect(fn2).not.toHaveBeenCalled()

        jest.advanceTimersByTime(299)
        await Promise.resolve();
        expect(fn2).toHaveBeenCalledTimes(1)
    })
})

/* 
Use resolves/rejects <Recommended>
await expect(resultPromise).resolves.toBeUndefined() 

Alternative approach - Also good
const result = await resultPromise
expect(result).toBeUndefined()


.resolves() is a modifier for expect() that tells JEST: 
>> this expect() is about a Promise, and I want to make an assertion about its resolved value. 

await expect(Promise.resolve(42)).resolves.toBe(42)
>> Wait for the Promise to resolve, and then assert that the resolved value is 42

🚨 But .resolves does not wait on its own
expect(promise).resolves.toBe(value)
*/