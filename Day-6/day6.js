const fs = require('fs');

fs.readFile('./Day-6/input.txt', 'utf8', (err, data) => {
    const groups = data.split('\n\n')

    let part1Count = 0
    let part2Count = 0

    groups.forEach(group => {
        letters = new Array(26).fill(0)

        forms = group.split('\n').join('')

        for(let i = 0; i < forms.length; i++) {
            let charCode = forms.charCodeAt(i) - 'a'.charCodeAt(0)
            letters[charCode]++
        }

        part1Count += letters.filter(val => val > 0).length
        part2Count += letters.filter(val => val == group.trim().split('\n').length).length
    })

    console.log(`Part 1 sum of counts is ${part1Count}.`)
    console.log(`Part 2 sum of counts is ${part2Count}.`)
})