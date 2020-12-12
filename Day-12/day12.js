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

    const absoluteDirection = (direction, current, distance) => {
        switch(direction) {
            case 'N':
            case 'S':
            case 'E':
            case 'W':
                return [direction, current, distance]
            case 'F':
                return [current, current, distance]
            default: // on L or R
                const directionObject = directionMap.get(current)
                if(distance === 180)
                    return [directionObject.reverse, directionObject.reverse, 0]
                if(distance === 270)
                    direction = direction === 'L' ? 'R' : 'L' // switches a 270 degree rotation to 90 degrees the opposite direction
                return direction === 'L' ? [directionObject.left, directionObject.left, 0] : [directionObject.right, directionObject.right, 0]
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
                
                return direction === 'L' ? [-currentY, currentX] : [currentY, -currentX]
        }
    }

    // part 1
    let currentDirection = 'E'
    let travelDirection = 'E'
    let X = 0, Y = 0
    for(let line of lines) {
        let distance = parseInt(line.slice(1));
        ([travelDirection, currentDirection, distance] = absoluteDirection(line.slice(0,1), currentDirection, distance))
        
        switch(travelDirection) {
            case 'N':
                Y += distance
                break
            case 'S':
                Y -= distance
                break
            case 'E':
                X += distance
                break
            case 'W':
                X -= distance
        }
    }

    console.log(`Part 1 Manhattan distance is ${Math.abs(X) + Math.abs(Y)}.`)

    // part 2
    currentDirection = 'E'
    X = 0, Y = 0
    let waypointX = 10, waypointY = 1
    for(let line of lines) {
        currentDirection = line.slice(0,1)
        let distance = parseInt(line.slice(1))
        if(currentDirection === 'F') {
            X += waypointX * distance
            Y += waypointY * distance
            continue
        }

        ([waypointX, waypointY] = updateWaypoint(currentDirection, waypointX, waypointY, distance))
    }

    console.log(`Part 2 Manhattan distance is ${Math.abs(X) + Math.abs(Y)}.`)
})