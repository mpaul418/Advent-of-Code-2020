const fs = require('fs');

fs.readFile('./Day-2/input.txt', 'utf8', (err, data) => {
    let lines = data.split('\n')
    lines.pop() // last line will be empty from the split
    let validPart1Passwords = 0
    let validPart2Passwords = 0

    lines.forEach(line => {
        let splitLine = line.split(' ') // index 0 is number range, index 1 is target letter, index 2 is password
        let [rangeStart, rangeEnd] = splitLine[0].split('-')
        let targetLetter = splitLine[1][0]
        let password = splitLine[2]

        const part1Regex = RegExp(`^(((?=[a-z])[^${targetLetter}])*${targetLetter}){${rangeStart},${rangeEnd}}((?=[a-z])[^${targetLetter}])*$`) // REGEX HELL
        if(part1Regex.test(password)) {
            validPart1Passwords++
        }

        const part2Regex1 = RegExp(`^[a-z]{${rangeStart - 1}}${targetLetter}[a-z]{${rangeEnd - rangeStart - 1}}((?=[a-z])[^${targetLetter}])[a-z]*$`)
        const part2Regex2 = RegExp(`^[a-z]{${rangeStart - 1}}((?=[a-z])[^${targetLetter}])[a-z]{${rangeEnd - rangeStart - 1}}${targetLetter}[a-z]*$`)

        if(part2Regex1.test(password) != part2Regex2.test(password)) {
            validPart2Passwords++
        }
    })

    console.log(`Part 1 has ${validPart1Passwords} valid passwords`)
    console.log(`Part 2 has ${validPart2Passwords} valid passwords`)
})