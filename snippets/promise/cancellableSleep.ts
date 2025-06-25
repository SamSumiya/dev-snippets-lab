export function cancellableSleep(delayMS: number): {p: Promise<string>; cancelFn: () => void} {
    let timeId: NodeJS.Timeout; 
    let rejectFn: (error: Error) => void

    const p = new Promise<string>((resolve, reject) => {
        rejectFn = reject 
        timeId = setTimeout(() => {
            resolve('resolved') 
        },delayMS)
    })

    const cancelFn = () => {
        clearTimeout(timeId)
        rejectFn?.(new Error('Cancelled'))
    }

    return {
        p,
        cancelFn
    }
}