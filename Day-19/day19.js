const fs = require('fs');

fs.readFile('./Day-19/input.txt', 'utf8', (err, data) => {
    const segments = data.trim().split('\n\n')
    const rulesText = segments[0].split('\n')
    const messages = segments[1].split('\n')
    const rules = new Map()
    const part2Rule8 = '42 | 42 8'
    const part2Rule11 = '42 31 | 42 11 31'
    let inPart2 = false

    // put each rule into a hashtable
    for(rule of rulesText) {
        let splitText = rule.split(': ')
        rules.set(parseInt(splitText[0]), splitText[1])
    }

    // creates a regex from the given rule
    const formRegex = (rule) => {
        if(rule === '') {
            console.log('Found empty string')
            return ''
        }
        if(rule[0] === '"') // if first character is a quotation mark -> matches a single character
            return rule[1]

        if(inPart2) {
            if(rule === part2Rule8) {
                return '(?:' + formRegex(rules.get(42)) + ')+'
            }
            else if(rule === part2Rule11) {
                return '((?:' + formRegex(rules.get(42)) + '){x})((?:' + formRegex(rules.get(31)) + '){x})'
            }
        }

        let orSplit = rule.split(' | ')
        if(!orSplit[1]) { // if there is no | in the expression
            let rulesToMatch = rule.split(' ')
            return rulesToMatch.reduce((acc, cur) => acc + formRegex(rules.get(parseInt(cur))), '')
            
        }
        else { // there is a | in the expression
            let [firstRule, secondRule] = orSplit[0].split(' ')
            let [thirdRule, fourthRule] = orSplit[1].split(' ')

            let firstHalf = !secondRule ? formRegex(rules.get(parseInt(firstRule))) : `${formRegex(rules.get(parseInt(firstRule)))}${formRegex(rules.get(parseInt(secondRule)))}`
            let secondHalf = !fourthRule ? formRegex(rules.get(parseInt(thirdRule))) : `${formRegex(rules.get(parseInt(thirdRule)))}${formRegex(rules.get(parseInt(fourthRule)))}`

            return `(?:(?:${firstHalf})|(?:${secondHalf}))`
        }
    }

    // part 1
    let targetRegex = new RegExp('^(' + formRegex(rules.get(0)) + ')$')
    let validMessages = 0
    for(message of messages) {
        if(targetRegex.test(message))
            validMessages++
    }

    console.log(`There are ${validMessages} valid messages for part 1.`)

    // setup for part 2
    rules.set(8, part2Rule8)
    rules.set(11, part2Rule11)
    inPart2 = true
    
    // part 2
    validMessages = 0
    for(let i = 1; i < 88; i++){ // 88 is hardcoded max. length of any message in input.txt; we only need this loop once so might as well hardcode it
        targetRegex = new RegExp(('^(?:' + formRegex(rules.get(0)) + ')$').replace(/x/g, i))
        for(message of messages) {
            if(targetRegex.test(message))
            validMessages++
        }
    }
    console.log(`There are ${validMessages} valid messages for part 2.`)
})