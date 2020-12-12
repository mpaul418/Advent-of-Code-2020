const fs = require('fs');

fs.readFile('./Day-11/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    const seating1 = lines.map(line => line.split(''))
    const seating2 = seating1.slice()
    for(let i = 0; i < seating1.length; i++) {
        seating2[i] = seating1[i].slice()
    }
    let seating1Current = true
    let currentSeating = seating1
    let nextSeating = seating2

    const countOccupiedSeats = (seating) => seating.reduce((acc, cur) => acc + cur.filter(val => val === '#').length, 0)
    const firstSeatInSight = (row, col, rowIncrement, colIncrement, seating) => {
        let X = row + rowIncrement, Y = col + colIncrement
        while(true) {
            if(!seating[X] || !seating[X][Y])
                return '.'
            if(seating[X][Y] !== '.')
                return seating[X][Y]

            X += rowIncrement
            Y += colIncrement
        }
    }

    const doesSwitchOccurPart1 = (row, col, current, seating) => {
        if(current === 'L') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(i === 1 && j === 1) { continue }
                    if(seating[row - 1 + i] && seating[row - 1 + i][col - 1 + j] && seating[row - 1 + i][col - 1 + j] === '#')
                        return false
                }
            }
            return true
        }
        else {
            let adjacentOccupied = 0
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(i === 1 && j === 1) { continue }
                    if(seating[row - 1 + i] && seating[row - 1 + i][col - 1 + j] && seating[row - 1 + i][col - 1 + j] === '#')
                        adjacentOccupied++
                }
            }
            return adjacentOccupied >= 4
        }
    }

    const doesSwitchOccurPart2 = (row, col, current, seating) => {
        
        if(current === 'L') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(i === 1 && j === 1) { continue }
                    let targetSeat = firstSeatInSight(row, col, i - 1, j - 1, seating)
                    if(targetSeat === '#')
                        return false
                }
            }
            return true
        }
        else {
            let adjacentOccupied = 0
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(i === 1 && j === 1) { continue }
                    let targetSeat = firstSeatInSight(row, col, i - 1, j - 1, seating)
                    if(targetSeat === '#')
                        adjacentOccupied++
                }
            }
            return adjacentOccupied >= 5
        }
    }

    // part 1 rules
    let updateOccurred = true
    while(updateOccurred) {
        updateOccurred = false
        // alternate which array is treated as the current one, and which is updated by seat switching
        currentSeating = seating1Current ? seating1 : seating2
        nextSeating = seating1Current ? seating2 : seating1

        for(let i = 0; i < currentSeating.length; i++) {
            for(let j = 0; j < currentSeating[i].length; j++) {
                if(currentSeating[i][j] === '.' || !doesSwitchOccurPart1(i,j, currentSeating[i][j], currentSeating))
                    nextSeating[i][j] = currentSeating[i][j]
                else {
                    updateOccurred = true
                    nextSeating[i][j] = currentSeating[i][j] === 'L' ? '#' : 'L'
                }
            }
        }

        seating1Current = !seating1Current
    }
    const part1Seats = countOccupiedSeats(currentSeating)

    // part 2 now
    // definitely a better way than just ctrl C+V but im lazy
    const seating3 = lines.map(line => line.split(''))
    const seating4 = seating3.slice()
    for(let i = 0; i < seating1.length; i++) {
        seating4[i] = seating3[i].slice()
    }
    let seating3Current = true
    currentSeating = seating3
    nextSeating = seating4

    updateOccurred = true
    while(updateOccurred) {
        updateOccurred = false
        // alternate which array is treated as the current one, and which is updated by seat switching
        currentSeating = seating3Current ? seating3 : seating4
        nextSeating = seating3Current ? seating4 : seating3

        for(let i = 0; i < currentSeating.length; i++) {
            for(let j = 0; j < currentSeating[i].length; j++) {
                if(currentSeating[i][j] === '.' || !doesSwitchOccurPart2(i,j, currentSeating[i][j], currentSeating))
                    nextSeating[i][j] = currentSeating[i][j]
                else {
                    updateOccurred = true
                    nextSeating[i][j] = currentSeating[i][j] === 'L' ? '#' : 'L'
                }
            }
        }

        seating3Current = !seating3Current
    }
    const part2Seats = countOccupiedSeats(currentSeating)

    console.log(`Number of part 1 occupied seats is ${part1Seats}.`)
    console.log(`Number of part 2 occupied seats is ${part2Seats}.`)
})