const fs = require('fs');

fs.readFile('./Day-7/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    const queue = []
    let visited = new Map()
    let neighbors = new Map() // adjacency list of incoming edges to a vertex
    let bagContains = new Map() // adjacency list of outgoing edges from a vertex
    let totalContainingBags = 0
    let bagsInShinyGold = 0
    const bagsContainedIn = (bags) => {
        if(bags === undefined) { return 0 }
        return bags.reduce((acc, cur) => {
            return acc + (cur[1] * (1 + bagsContainedIn(bagContains.get(cur[0]))))
        }, 0)
    }

    lines.forEach(line => {
        let split = line.split(' bags contain ')
        let rightRegex = /(?:(\d) (\w+ \w+) bags?, )|(?:(\d) (\w+ \w+) bags?\.)/g
        let parentBag = split[0]
        let bagName
        visited.set(parentBag, 0)
        while((bagName = rightRegex.exec(split[1])) !== null) {
            let currentBag = bagName[2] !== undefined ? bagName[2] : bagName[4]
            let bagNumber = bagName[2] != undefined ? bagName[1] : bagName[3]
        
            if(bagContains.get(parentBag) === undefined) {
                bagContains.set(parentBag, [[currentBag, bagNumber]])
            }
            else { bagContains.get(parentBag).push([currentBag, bagNumber])}

            if(neighbors.get(currentBag) === undefined) {
                neighbors.set(currentBag, [parentBag])
            }
            else { 
                if(neighbors.get(currentBag).findIndex(val => val === parentBag) === -1) {
                    neighbors.get(currentBag).push(parentBag)
                }
            }  
        }
    })

    queue.push('shiny gold')

    // BFS
    while(queue.length > 0) {
        let currentBag = queue.shift()
        visited.set(currentBag, 1)
        let currentParents = neighbors.get(currentBag)
        
        if(currentParents !== undefined) {
            currentParents.forEach(parent => {
                if(visited.get(parent) === 0) {
                    totalContainingBags++
                    visited.set(parent, 1)
                    queue.push(parent)
                }
            })
        }
    }

    bagsInShinyGold = bagsContainedIn(bagContains.get('shiny gold'))

    console.log(`Total possible containing bags: ${totalContainingBags}.`)
    console.log(`Bags contained in one shiny gold bag: ${bagsInShinyGold}.`)
})
