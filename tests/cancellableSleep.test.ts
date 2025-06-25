import { execPath } from "process";
import { cancellableSleep } from "../snippets/promise/cancellableSleep";

describe('cancellableSleep', () => {
    beforeEach(() => {
        jest.useFakeTimers() 
    })

    afterEach(() => {
        jest.useRealTimers() 
    })

    it('should call setTimeout with correct delay', async() => {
        const spy = jest.spyOn(global, 'setTimeout')

        cancellableSleep(100)

        // jest.advanceTimersByTime(100)

        expect(spy).toHaveBeenCalledWith(expect.any(Function), 100)
        spy.mockRestore()
    })
/* 
so spy does not connect to ```p``` directly
timeID = setTimeout(() => {...}) // Spy capturs this call 
> spy.mock.calls[0][0] is () => { resolve() }
> spy.mock.calls[0][1] is 100 
>> spy does not become the Promise or callback - it just observes and records the call to setTimeout 
*/

    it('should be able to cancel', async() => {
        const { p, cancelFn } = cancellableSleep(1000)

        jest.advanceTimersByTime(100)         
        cancelFn() 

        await expect(p).rejects.toThrow('Cancelled')
    })

    it('should resolve', async() => {
        const { p, cancelFn } = cancellableSleep(1000) 
        jest.advanceTimersByTime(1000)
        
        await Promise.resolve() 
        await expect(p).resolves.toBe('resolved')
        expect(() => cancelFn()).not.toThrow()
    })
})