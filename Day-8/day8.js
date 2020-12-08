const fs = require('fs');

fs.readFile('./Day-8/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    const originalCommands = new Array(lines.length).fill(new Array(2).fill(0)) // each command is an array of length 2 ([command, number])

    for(let i = 0; i < lines.length; i++) {
        originalCommands[i] = lines[i].split(' ')
    }

    const runInstructions = (commands) => {
        let currentInstruction = 0
        let accumulator = 0
        let visited = new Array(commands.length).fill(0)
        while(currentInstruction < commands.length && visited[currentInstruction] === 0) { // while instruction was not previously visited
            visited[currentInstruction] = 1

            let currentCommand = commands[currentInstruction]

            switch(currentCommand[0]) {
                case 'acc':
                    accumulator += parseInt(currentCommand[1])
                    currentInstruction++
                    break
                case 'jmp':
                    currentInstruction += parseInt(currentCommand[1])
                    break
                default:
                    currentInstruction++
            }
        }

        return currentInstruction === commands.length ? [accumulator, 1] : [accumulator, 0] // 1 if the program correctly terminates, 0 if infinite loop
    }

    const findPart2Accumulator = () => { // just brute forces through every command until finding correct one to switch
        for(let i = 0; i < originalCommands.length; i++) {
            if(originalCommands[i][0] === 'jmp' || originalCommands[i][0] === 'nop') {
                let flippedCommand = originalCommands[i][0] === 'jmp' ? ['nop', originalCommands[i][1]] :  ['jmp', originalCommands[i][1]] // switches jmp to nop, or vice versa
                let accumulatorResult = runInstructions([...originalCommands.slice(0,i), flippedCommand, ...originalCommands.slice(i + 1)])

                if(accumulatorResult[1] === 1) { return accumulatorResult[0] } // return if the program correctly terminates with these commands
            }
        }
        return -1 // should never happen
    }
    
    let part1Accumulator = runInstructions(originalCommands)[0]
    let part2Accumulator = findPart2Accumulator()

    console.log(`Value of accumulator right before duplicate instruction is ${part1Accumulator}.`)
    console.log(`Value of accumulator after fixed instruction is ${part2Accumulator}.`)
})