const fs = require('fs');

fs.readFile('./Day-3/input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n')
    lines.pop()

    const slopeTreesHit = (deltaX, deltaY) => {
        let x = 0
        const maxX = lines[0].length
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
    
    const slopeTreeCounts = [slopeTreesHit(1,1), slopeTreesHit(3,1), slopeTreesHit(5,1), slopeTreesHit(7,1), slopeTreesHit(1,2)]

    console.log(`Part 1 trees hit: ${slopeTreeCounts[1]}`)
    console.log(`Product of all trees hit: ${slopeTreeCounts.reduce((accumulator, currentValue) => accumulator * currentValue)}`)
})