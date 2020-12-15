const fs = require('fs');

fs.readFile('./Day-15/input.txt', 'utf8', (err, data) => {
    const input = data.trim().split('\n')
    
    const startingNumbers = input[0].split(',').map(val => parseInt(val))

    const numberGame = (maxTurn) => {
        const spokenNumbers = new Map()
    
        for(let i = 0; i < startingNumbers.length - 1; i++)
            spokenNumbers.set(startingNumbers[i], i + 1)

        let lastSpokenNumber = startingNumbers[startingNumbers.length - 1]

        for(let turnNumber = startingNumbers.length; turnNumber < maxTurn; turnNumber++) {
            let nextNumber = spokenNumbers.has(lastSpokenNumber) ? turnNumber - spokenNumbers.get(lastSpokenNumber) : 0
    
            spokenNumbers.set(lastSpokenNumber, turnNumber)
            lastSpokenNumber = nextNumber
        }
        return lastSpokenNumber
    }
    console.log(`The 2020th number spoken is ${numberGame(2020)}.`)
    console.log(`The 30000000th number spoken is ${numberGame(30000000)}.`)
})