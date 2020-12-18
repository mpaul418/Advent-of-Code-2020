const fs = require('fs');

fs.readFile('./Day-18/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().replace(/ /g,'').split('\n') // removes spaces from the input

    // Either adds or multiplies two numbers and returns the result.
    const compute = (term1, operation, term2) => {
        if(operation === '+') {
            return parseInt(term1) + parseInt(term2)
        }
        else { // multiplication
            return parseInt(term1) * parseInt(term2)
        }
    }

    // Since + takes precedence, that means * is secondary always; therefore we can take any X*Y expression and replace it with (X)*(Y)
    // Then we will use this new expression to evaluate the part 2 logic with the part 1 algorithms.
    const insertParentheses = (expr) => {
        let [term1, operation, term2, rest] = splitExpression(expr)
        let term1Stripped = term1[0] === '(' ? term1.slice(1, term1.length - 1) : term1.slice()

        if(!/\+|\*/.exec(expr)) { // Base case: when the expression is just a number
            return expr
        }
        if(!term2) {
            return '(' + insertParentheses(term1Stripped) + ')'
        }

        if(!rest) {
            rest = ''
        }

        if(operation === '*')
            return `(${insertParentheses(term1Stripped)})${operation}(${insertParentheses(term2 + rest)})`
        else
            return `${insertParentheses(term1)}${operation}${insertParentheses(term2 + rest)}`
    }

    // Assuming that the character at startIndex is '(', finds the ')' character that closes the parentheses.
    const findMatchingParenthesis = (expr, startIndex) => {
        let openParens = 0
        for(let i = startIndex; i < expr.length; i++) {
            if(expr[i] === '(') {
                openParens++
            }
            else if(expr[i] === ')') {
                openParens--
                if(openParens === 0)
                    return i
            }
        }

        return -1 // should never happen
    }

    // Splits the expression X*Y...rest into [X,*,Y,rest]
    const splitExpression = (expr) => {
        let term1, operation, term2, rest
        let term1EndIndex = -1
        let term2StartIndex = -1, term2EndIndex = -1

        if(expr[0] !== '(') { // if first char is just a number
            term1EndIndex = /\+|\*/.exec(expr) ? /\+|\*/.exec(expr).index - 1 : expr.length - 1 // it might hit the end of the string, which wouldn't match
        }
        else { // if first char is a parenthesis
            term1EndIndex = findMatchingParenthesis(expr, 0)
        }
        term1 = expr.slice(0, term1EndIndex + 1)
        operation = expr[term1EndIndex + 1]
        term2StartIndex = term1EndIndex + 2
        
        if(expr[term2StartIndex] !== '(') {
            term2EndIndex = /\+|\*/.exec(expr.slice(term2StartIndex)) ? /\+|\*/.exec(expr.slice(term2StartIndex)).index - 1 + term2StartIndex : expr.length - 1 // it might hit the end of the string, which wouldn't match
        }
        else {
            term2EndIndex = findMatchingParenthesis(expr, term2StartIndex)
        }
        term2 = expr.slice(term2StartIndex, term2EndIndex + 1)
        rest = expr.slice(term2EndIndex + 1)

        return [term1, operation, term2, rest]
    }

    // Recursively evaluates an expression and returns its value according to Part 1 math rules (+ and * treated equally).
    const solve = (expr) => {
        let [term1, operation, term2, rest] = splitExpression(expr)
        
        // if term 1 is in parentheses, remove one layer
        let term1Stripped = term1[0] === '(' ? term1.slice(1, term1.length - 1) : term1.slice()
        
        if(!term2) {
            if(/\+|\*/.exec(term1)) {
                return solve(term1Stripped)
            }
            else { // Base case: when the entire expression is just a number
                return parseInt(term1Stripped)
            }
        }
        if(!rest) {
            return compute(solve(term1Stripped), operation, solve(term2))
        }

        return solve('' + compute(solve(term1Stripped), operation, solve(term2)) + rest)
    }

    let resultSumP1 = 0, resultSumP2 = 0
    for(line of lines) {
        resultSumP1 += solve(line)
        resultSumP2 += solve(insertParentheses(line))
    }

    console.log(`The sum of the resulting values is ${resultSumP1}.`)
    console.log(`Under advanced math, the sum of the resulting values is ${resultSumP2}.`)
})