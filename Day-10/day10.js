const fs = require('fs');

fs.readFile('./Day-10/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    const adapters = lines.map(val => parseInt(val))
    adapters.sort(function(a, b){return a - b});
    adapters.push(adapters[adapters.length - 1] + 3) // add the max joltage to the list

    let prevJoltage = 0
    let oneJoltDifferences = 0, threeJoltDifferences = 0
    const pathsToIndex = new Array(adapters.length).fill(0)
    pathsToIndex[0] = 1

    for(let i = 0; i < adapters.length; i++) {
        let currentJoltage = adapters[i]

        // part 1 calculation
        if(currentJoltage - prevJoltage === 1)
            oneJoltDifferences++
        else if(currentJoltage - prevJoltage === 3)
            threeJoltDifferences++

        // part 2 calculation
        if(i > 0) { // dynamic programming !!
            pathsToIndex[i] = pathsToIndex[i - 1]
                + (i - 2 >= 0 && currentJoltage - adapters[i - 2] <= 3 ? pathsToIndex[i - 2] : 0)
                + (i - 3 >= 0 && currentJoltage - adapters[i - 3] <= 3 ? pathsToIndex[i - 3] : 0);
        }
        if(i === 1 || i === 2) { // need to adjust in case index 1 or 2 can reach the source adapter
            if(currentJoltage <= 3)
                pathsToIndex[i]++
        }
        
        prevJoltage = currentJoltage
    }

    console.log(`Product of the two differences is ${oneJoltDifferences * threeJoltDifferences}.`)
    console.log(`Total valid distinct arrangements is ${pathsToIndex[adapters.length - 1]}.`)
})