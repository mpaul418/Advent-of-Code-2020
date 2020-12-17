const fs = require('fs');

fs.readFile('./Day-16/input.txt', 'utf8', (err, data) => {
    const segments = data.trim().split('\n\n') // [0] is fields, [1] is our ticket, [2] is their tickets
    
    const fieldNames = segments[0].split('\n').map(val => val.split(': ')[0])
    const myTicket = segments[1].split('\n')[1].split(',').map(val => parseInt(val))
    const validFieldRanges = segments[0].split('\n')
        .map(val => val.split(': ')[1].split(' or '))
        .map(fieldRanges => fieldRanges.map(range => range.split('-').map(val => parseInt(val))))

    const invalidTicketFields = (ticketNumbers) => { // finds all invalid values for a ticket
        for(fieldRanges of validFieldRanges) {
            for(range of fieldRanges) {
                let [min, max] = range
                ticketNumbers = ticketNumbers.filter(val => val < min || val > max) // removes any numbers that fit inside the range
            }
        }
        return ticketNumbers
    }

    const validFieldIndices = (num) => {
        const result = []
        for(let i = 0; i < validFieldRanges.length; i++) {
            for(range of validFieldRanges[i]) {
                let [min, max] = range
                if(num >= min && num <= max) {
                    result.push(i)
                    break;
                }
            }
        }
        return result
    }

    const findFirstIndex = () => { // finds the first column that has only one valid field
        for(let i = 0; i < colPossibleFields.length; i++) {
            if(colPossibleFields[i].length === 1){
                return i
            }
        }
    }

    // part 1
    let sumInvalidValues = 0
    let nearbyTickets = segments[2].split('\n').slice(1)
    for(ticket of nearbyTickets) {
        let numbers = ticket.split(',').map(val => parseInt(val))
        sumInvalidValues += invalidTicketFields(numbers).reduce((acc, cur) => acc + cur, 0)
    }
    
    //part 2
    nearbyTickets = nearbyTickets.filter(arr => invalidTicketFields(arr.split(',').map(val => parseInt(val))).length === 0)
    const validFieldColumns = new Map()
    for(let i = 0; i < fieldNames.length; i++) { // each column starts having 0 valid tickets from every row
        validFieldColumns.set(i, new Array(nearbyTickets[0].split(',').length).fill(0)) // array[j] = number of incoming edges from column j
    }
    // each validFieldColumns[i] is an array where each value is, for field i, the number of tickets in each column that satisfy its range
    for(ticket of nearbyTickets) {
        const numbers = ticket.split(',').map(val => parseInt(val))
        for(let column = 0; column < numbers.length; column++) {
            validFieldIndices(numbers[column]).forEach(val => {
                let currentCounts = validFieldColumns.get(val)
                validFieldColumns.set(val, [...currentCounts.slice(0,column), currentCounts[column] + 1, ...currentCounts.slice(column + 1)])
            })
        }
    }
    const colPossibleFields = new Array(fieldNames.length).fill([])
    
    // colPossibleFields[i] is an array where each value is an index where all tickets satisfy field i's range at that column
    for(let fieldIndex = 0; fieldIndex < fieldNames.length; fieldIndex++) {
        let columns = validFieldColumns.get(fieldIndex)
        for(let col = 0; col < columns.length; col++) {
            if(columns[col] === nearbyTickets.length) {
                colPossibleFields[fieldIndex] = [...colPossibleFields[fieldIndex], col]
            }
        }
    }

    let departureSum = 1
    for(let i of new Array(fieldNames.length)) {
        let index = findFirstIndex() // finds the field that is only satisfied by one column
        let foundColumn = colPossibleFields[index][0] // the column that satisfies this field
        if(fieldNames[index].includes('departure')){
            departureSum *= myTicket[foundColumn]
        }
        for(let i = 0; i < colPossibleFields.length; i++) { // remove the column from all fields
            let targetIndex = colPossibleFields[i].findIndex(val => val === foundColumn)
            if(targetIndex !== -1)
                colPossibleFields[i] = [...colPossibleFields[i].slice(0,targetIndex), ...colPossibleFields[i].slice(targetIndex + 1)]
        }
    }

    console.log(`The sum of all invalid values is ${sumInvalidValues}.`)
    console.log(`Multiplying the six departure fields equals ${departureSum}.`)
})