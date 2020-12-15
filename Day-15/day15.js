const fs = require('fs');

fs.readFile('./Day-15/input.txt', 'utf8', (err, data) => {
    const input = data.trim().split('\n')
    
    const startingNumbers = input[0].split(',').map(val => parseInt(val))

    const numberGame = (maxTurn) => {
        const spokenNumbers = new Map()
    
        for(let i = 0; i < startingNumbers.length; i++)
            spokenNumbers.set(startingNumbers[i], [i + 1, 0])

        let lastSpokenNumber = startingNumbers[startingNumbers.length - 1]

        for(let turnNumber = startingNumbers.length + 1; turnNumber < maxTurn; turnNumber++) {
            let lastSpokenNum = spokenNumbers.get(lastSpokenNumber)
            if(!lastSpokenNum) {
                spokenNumbers.set(lastSpokenNumber, [turnNumber, 0])
            }
            let nextNumber = lastSpokenNum[1] === 0 ? 0 : lastSpokenNum[0] - lastSpokenNum[1]
            let nextNumHistory = spokenNumbers.get(nextNumber)
    
            spokenNumbers.set(nextNumber, [turnNumber, nextNumHistory ? nextNumHistory[0] : 0]) // shifts the first index one to the right
            lastSpokenNumber = nextNumber
        }
        return spokenNumbers.get(lastSpokenNumber)[0] - spokenNumbers.get(lastSpokenNumber)[1]
    }
    console.log(`The 2020th number spoken is ${numberGame(2020)}.`)
    console.log(`The 30000000th number spoken is ${numberGame(30000000)}.`)
})