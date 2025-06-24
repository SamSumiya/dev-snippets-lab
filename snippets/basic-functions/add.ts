export function add(number1: any, number2: any ): number {
    if (typeof number1 !== 'number' || typeof number2 !== 'number' ) {
        throw new TypeError('Inputs must be numbers')
    }

    return number1 + number2
}

const r = add( 1, 2 )
console.log(r) 


/* 
// Notes 
export function add(number1: number, number2: number ): number {
    try {
        return number1 + number2
    } catch(err) {
        throw new Error(err)
    }
}
the try/catch is uncessary because num1 + num2 won't throw an error
for normal JS numbers, even if inputs are invalid types
: ts will complain but at runtime JS tries to coerce...

the catch block here just re-throw the error wrapped in a new Error,
which is redundant
*/