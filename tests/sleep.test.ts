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

        const p1 = sleep(100).then(fn1)
        const p2 = sleep(200).then(fn2)

        jest.advanceTimersByTime(100)
        await Promise.resolve() // option1 
        // await p1 // option2 
        // await expect(p1).resolves.toBeUndefined() // option3 
        expect(fn1).toHaveBeenCalledTimes(1)
        expect(fn2).not.toHaveBeenCalled() 

        jest.advanceTimersByTime(100)
        await Promise.resolve()
        // await p2
        // await expect(p2).resolves.toBeUndefined()
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