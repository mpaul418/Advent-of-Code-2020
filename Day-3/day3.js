const fs = require('fs');

fs.readFile('./Day-3/input.txt', 'utf8', (err, data) => {
    let lines = data.split('\n')
    lines.pop()

    const slopeTreesHit = (deltaX, deltaY) => {
        let x = 0
        let maxX = lines[0].length
        let y = 0
        let treesHit = 0
    
        while(y < lines.length) {
            if(lines[y][x] === '#') {
                treesHit++
            }
            x = (x + deltaX) % maxX
            y += deltaY
        }
    
       return treesHit
    }
    
    const reducer = (accumulator, currentValue) => accumulator * currentValue;
    let slopeTreeCounts = [slopeTreesHit(1,1), slopeTreesHit(3,1), slopeTreesHit(5,1), slopeTreesHit(7,1), slopeTreesHit(1,2)]

    console.log(`Product of all trees hit: ${slopeTreeCounts.reduce(reducer)}`)
})