const fs = require('fs');
const { networkInterfaces } = require('os');

fs.readFile('./Day-17/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')

    let activeCubes = new Map()
    let inactiveCubes
    // initialize with the starting active cubes
    for(let y = 0; y < lines.length; y++) { 
        let chars = lines[y].split('')
        for(let x = 0; x < lines[y].length; x++) {
            if(chars[x] === '#') {
                activeCubes.set(`${x},${lines.length - y - 1},0`) // since 2d arrays normally go top to bottom, go bottom to top instead to align with normal coordinate system
                // Using a normal array would not work for the hashtable, so we convert it to a string: format = 'XYZ'
            }
        }
    }

    const allNeighborPositions = (x,y,z) => {
        const neighbors = []
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                for(let k = -1; k <= 1; k++) {
                    if(i !== 0 || j !== 0 || k !== 0) { // does not add current position
                        neighbors.push([x+i,y+j,z+k])
                    }
                }
            }
        }

        return neighbors
    }

    // find the active neighbors of an (x,y,z) position, and increments counter on inactive cubes
    const evaluateNeighbors = (x,y,z) => {
        let count = 0
        const neighbors = allNeighborPositions(x,y,z)

        for(let [nX, nY, nZ] of neighbors) {
            if(activeCubes.has(`${nX},${nY},${nZ}`)) {
                count++
            }
            else {
                let currentCount = inactiveCubes.get(`${nX},${nY},${nZ}`)
                inactiveCubes.set(`${nX},${nY},${nZ}`, currentCount ? currentCount + 1 : 1) // if (x,y,z) already known as inactive, increment it; otherwise set to 1
            }
        }

        return count
    }

    for(i of new Array(6)) { // run 6 cycles
        inactiveCubes = new Map()
        let nextActiveCubes = new Map()

        for(let position of activeCubes.keys()) { // for each active cube:
            let [x,y,z] = position.split(',').map(val => parseInt(val))

            const activeNeighbors = evaluateNeighbors(x,y,z)
            if(activeNeighbors === 2 || activeNeighbors === 3) {
                nextActiveCubes.set(`${x},${y},${z}`, 1)
            }
        }
        // by this point, side effects in evaluateNeighbors have filled inactiveCubes,
        // so we can check which inactive cubes get switched to active
        inactiveCubes.forEach((activeNeighbors, key) => {
            let [x,y,z] = key.split(',').map(val => parseInt(val))
            if(activeNeighbors === 3) {
                nextActiveCubes.set(`${x},${y},${z}`, 1)
            }
        })

        activeCubes = nextActiveCubes
    }

    console.log(`After 6 cycles in 3 dimensions, there are ${activeCubes.size} active cubes.`)

    // --------------------- PART 2 - just Ctrl-C/V + changing functions to save time ------------------------

    activeCubes = new Map()
    // initialize with the starting active cubes
    for(let y = 0; y < lines.length; y++) { 
        let chars = lines[y].split('')
        for(let x = 0; x < lines[y].length; x++) {
            if(chars[x] === '#') {
                activeCubes.set(`${x},${lines.length - y - 1},0,0`) // added 4th dimension, w
            }
        }
    }

    const allNeighborPositionsP2 = (x,y,z,w) => {
        const neighbors = []
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                for(let k = -1; k <= 1; k++) {
                    for(let m= -1; m <= 1; m++) {
                        if(i !== 0 || j !== 0 || k !== 0 || m !== 0) { // does not add current position
                            neighbors.push([x+i,y+j,z+k,w+m])
                        }
                    }
                }
            }
        }

        return neighbors
    }

    // find the active neighbors of an (x,y,z,w) position, and increments counter on inactive cubes
    const evaluateNeighborsP2 = (x,y,z,w) => {
        let count = 0
        const neighbors = allNeighborPositionsP2(x,y,z,w)

        for(let [nX, nY, nZ, nW] of neighbors) {
            if(activeCubes.has(`${nX},${nY},${nZ},${nW}`)) {
                count++
            }
            else {
                let currentCount = inactiveCubes.get(`${nX},${nY},${nZ},${nW}`)
                inactiveCubes.set(`${nX},${nY},${nZ},${nW}`, currentCount ? currentCount + 1 : 1) // if (x,y,z,w) already known as inactive, increment it; otherwise set to 1
            }
        }

        return count
    }

    for(i of new Array(6)) { // run 6 cycles
        inactiveCubes = new Map()
        let nextActiveCubes = new Map()

        for(let position of activeCubes.keys()) { // for each active cube:
            let [x,y,z,w] = position.split(',').map(val => parseInt(val))

            const activeNeighbors = evaluateNeighborsP2(x,y,z,w)
            if(activeNeighbors === 2 || activeNeighbors === 3) {
                nextActiveCubes.set(`${x},${y},${z},${w}`, 1)
            }
        }
        // by this point, side effects in evaluateNeighbors have filled inactiveCubes,
        // so we can check which inactive cubes get switched to active
        inactiveCubes.forEach((activeNeighbors, key) => {
            let [x,y,z,w] = key.split(',').map(val => parseInt(val))
            if(activeNeighbors === 3) {
                nextActiveCubes.set(`${x},${y},${z},${w}`, 1)
            }
        })

        activeCubes = nextActiveCubes
    }

    console.log(`After 6 cycles with 4 dimensions, there are ${activeCubes.size} active cubes.`)
})