// Basic Pollling with loop 

const delay = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))

async function polling(maxAttempts: number = 5) {
    let count: number = 0 

    while ( count < maxAttempts ) {
        const response = await fetch('./data')

        if (response.status === 200) {
            const data = await response.json()
            if (data.ready) {
                console.log("Data is available")
                return data 
            }
        }

        count++ 
        if (count < maxAttempts) {
            await delay(2000)
        }
    }

    throw new Error('Polling timed out after maximum attempts')
}
