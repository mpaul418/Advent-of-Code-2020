const fs = require('fs');

fs.readFile('./Day-12/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    const north = { forward : 'N', right : 'E', left : 'W', reverse : 'S'}
    const south = { forward : 'S', right : 'W', left : 'E', reverse : 'N'}
    const east = { forward : 'E', right : 'S', left : 'N', reverse : 'W'}
    const west = { forward : 'W', right : 'N', left : 'S', reverse : 'E'}
    const directionMap = new Map()
    directionMap.set('N', north)
    directionMap.set('S', south)
    directionMap.set('E', east)
    directionMap.set('W', west)

    const updateLocation = (direction, currentDirection, currentX, currentY, distance) => {
        if(direction === 'F')
            direction = currentDirection

        switch(direction) {
            case 'N':
                return [currentX, currentY + distance, currentDirection]
            case 'S':
                return [currentX, currentY - distance, currentDirection]
            case 'E':
                return [currentX + distance, currentY, currentDirection]
            case 'W':
                return [currentX - distance, currentY, currentDirection]
            default: // on L or R
                const directionObject = directionMap.get(currentDirection)
                if(distance === 180)
                    return [currentX, currentY, directionObject.reverse]
                if(distance === 270)
                    direction = direction === 'L' ? 'R' : 'L' // switches a 270 degree rotation to 90 degrees the opposite direction
                return direction === 'L' ? [currentX, currentY, directionObject.left] : [currentX, currentY, directionObject.right]
        }
    }

    const updateWaypoint = (direction, currentX, currentY, distance) => {
        switch(direction) {
            case 'N':
                return [currentX, currentY + distance]
            case 'S':
                return [currentX, currentY - distance]
            case 'E':
                return [currentX + distance, currentY]
            case 'W':
                return [currentX - distance, currentY]
            default: // on L or R
                if(distance === 180)
                    return [-currentX, -currentY]
                if(distance === 270)
                    direction = direction === 'L' ? 'R' : 'L' // switches a 270 degree rotation to 90 degrees the opposite direction
                
                return direction === 'L' ? [-currentY, currentX] : [currentY, -currentX] // rotates the waypoint location 90 degrees
        }
    }

    // part 1
    let currentDirection = 'E'
    let X = 0, Y = 0
    for(let line of lines) {
        let distance = parseInt(line.slice(1));
        ([X, Y, currentDirection] = updateLocation(line.slice(0,1), currentDirection, X, Y, distance))
    }

    console.log(`Part 1 Manhattan distance is ${Math.abs(X) + Math.abs(Y)}.`)

    // part 2
    let nextDirection
    X = 0, Y = 0
    let waypointX = 10, waypointY = 1
    for(let line of lines) {
        nextDirection = line.slice(0,1)
        let distance = parseInt(line.slice(1))
        if(nextDirection === 'F') {
            X += waypointX * distance
            Y += waypointY * distance
            continue
        }

        ([waypointX, waypointY] = updateWaypoint(nextDirection, waypointX, waypointY, distance))
    }

    console.log(`Part 2 Manhattan distance is ${Math.abs(X) + Math.abs(Y)}.`)
})