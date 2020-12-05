const fs = require('fs');

fs.readFile('./Day-5/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')

    let maxSeatID = 0
    const seatNumbers = []

    lines.forEach(line => {
        const binaryToString = (arr) => arr.reduce((acc, current) => acc + current.toString(), '') // concatenate char array of binary into one string

        const rowBinary = line.slice(0,7).split('').map(char => char === 'B' ? 1 : 0) // convert into array of binary digits
        const columnBinary = line.slice(7).split('').map(char => char === 'R' ? 1 : 0)

        const rowNum = parseInt(binaryToString(rowBinary), 2) // convert the binary string into a base 10 number
        const columnNum = parseInt(binaryToString(columnBinary), 2)

        let seatID = 8 * rowNum + columnNum
        seatNumbers.push(seatID)

        if(seatID > maxSeatID) { maxSeatID = seatID }
    })

    const countingSort = new Array(maxSeatID).fill(0)
    seatNumbers.forEach(num => countingSort[num - 1] = 1)

    let mySeatID = countingSort.findIndex((value, index) =>
        index > 0 && 
        index < maxSeatID - 1 && 
        countingSort[index] == 0 && 
        countingSort[index - 1] == 1 && 
        countingSort[index + 1] == 1 ) + 1

    console.log(`Highest seat ID is ${maxSeatID}.`)
    console.log(`My seat number is ${mySeatID}.`)
})