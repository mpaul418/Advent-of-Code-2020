const { time } = require('console');
const fs = require('fs');

fs.readFile('./Day-13/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    const estimate = parseInt(lines[0])
    const buses = lines[1].split(',').filter(val => val !== 'x').map(val => parseInt(val))

    // part 1
    let timestamp = estimate
    let earliestBusID = -1
    while(true) {
        let validBuses = buses.filter(val => timestamp % val === 0)
        if(validBuses.length > 0) {
            earliestBusID = validBuses[0]
            break
        }
        timestamp++
    }

    console.log(`ID of bus times amount of time waiting is ${earliestBusID * (timestamp - estimate)}.`)

    // part 2
    const busOrder = lines[1].split(',').map(val => {
        return val === 'x' ? -1 : parseInt(val)
    })
    let maxIndex = -1
    let max = 0
    for(let i = 0; i < busOrder.length; i++) {
        if(busOrder[i] > max) {
            maxIndex = i
            max = busOrder[i]
        }
    }
    let validTimestamp = false
    let i = 0
    const convergences = [max]
    let convergenceSum = max

    timestamp = 0
    if((timestamp + maxIndex) % convergenceSum !== 0) {
        timestamp += convergenceSum - (timestamp + maxIndex) % convergenceSum
    }

    while(!validTimestamp) {
        for(i = 0; i < busOrder.length; i++) {
            let busID = busOrder[i]
            if(busID !== -1 && convergences.indexOf(busID) === -1) {
                if((timestamp + i) % busID === 0){
                    convergences.push(busID)
                    if(convergenceSum % busID !== 0)
                        convergenceSum *= busID
                }
            }
        }

        if(convergences.length === buses.length)
            break

        timestamp += convergenceSum
    }

    console.log(`Earliest timestamp matching part 2 is ${timestamp}.`)
})