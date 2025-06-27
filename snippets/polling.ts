// Basic Pollling with loop 

type FetchFn = () => Promise<{status: number, json: () => Promise<{ready: boolean}>}>
type DelayFn = (ms: number) => Promise<void>  

const delayFn = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))

async function polling(
    delayFn: DelayFn, 
    fetchFn: FetchFn, 
    maxAttempts: number = 5,
    delayMS: 2000
) {
    let count: number = 0 

    while ( count < maxAttempts ) {
        const response = await fetchFn()

        if (response.status === 200) {
            const data = await response.json()
            if (data.ready) {
                console.log("Data is available")
                return data 
            }
        }

        count++ 
        if (count < maxAttempts) {
            await delayFn(delayMS)
        }
    }

    throw new Error('Polling timed out after maximum attempts')
}

let attempt = 0 

async function fetchFn() {
    attempt++
    console.log(`Fetch attempt ${attempt}`)
    return {
        status: 200,
        json: async () => ({
            ready: attempt >= 3, 
            message: `This is attempt ${attempt}`,
            timestamp: Date.now()
        })
    }
}

// Using new Promise 
// Promise.resolve(...) also works 
function fetchFN() {
    attempt++
    return new Promise((resolve) => {
        resolve({
            status: 200, 
            json: () => {
                return new Promise((resolve) => {
                    resolve({
                        ready: attempt >= 3, 
                        message: `This is attempt ${attempt}`,
                        timestamp: Date.now()
                    })
                })
            }
        })
    })
}