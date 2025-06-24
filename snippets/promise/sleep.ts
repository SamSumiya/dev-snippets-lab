export function sleep(delayMS: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, delayMS) 
    })
}

function asyncSleep(delayMS: number): Promise<void> {
    const res = new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, delayMS)
    })

    return res 
}

