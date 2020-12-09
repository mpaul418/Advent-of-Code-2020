const fs = require('fs');

fs.readFile('./Day-9/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    const preambleLength = 25
    let currentIndex = 0
    let currentNumber = -1
    const queue = []
    let buffer = new Map()

    const allNumbers = []
    lines.forEach(val => allNumbers.push(parseInt(val))) // needed for part 2 mainly

    // initialize the preamble
    for(currentIndex = 0; currentIndex < preambleLength; currentIndex++) {
        let num = allNumbers[currentIndex]
        queue.push(num)
        buffer.set(num, 1) // 1 is arbitrary
    }
    currentNumber = allNumbers[currentIndex]

    // check if there are two values that sum to current value
    const isValidBuffer = (target) => {
        for(let i = 0; i < queue.length; i++) {
            if(buffer.has(target - queue[i])) { return true }
        }

        return false
    }

    // find the vulnerability
    while(isValidBuffer(currentNumber)) {
        buffer.delete(queue.shift())
        buffer.set(currentNumber, 1)
        queue.push(currentNumber)

        currentNumber = allNumbers[++currentIndex]
    }

    // find the contiguous sum to the vulnerability
    let startIndex = 0, endIndex = 1
    let sum = allNumbers[startIndex] + allNumbers[endIndex]
    while(sum !== currentNumber) {
        if(sum > currentNumber) { sum -= allNumbers[startIndex++] } // remove first element from the sum
        else { sum += allNumbers[++endIndex] } // add next element to the sum
    }

    const min = Math.min(...allNumbers.slice(startIndex, endIndex + 1))
    const max = Math.max(...allNumbers.slice(startIndex, endIndex + 1))

    console.log(`First number to break property is ${currentNumber}.`)
    console.log(`Sum of min and max is ${min + max}.`)
})