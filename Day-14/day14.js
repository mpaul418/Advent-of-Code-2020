const { time } = require('console');
const fs = require('fs');

fs.readFile('./Day-14/input.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n')
    
    let memory = new Map()
    let currentMask = [] // mask will be converted to a char array
    const memoryRegex = /mem\[(\d+)\]/
    const BITS = 36

    const floatingOffsets = (indices, indexNum) => { // computes all possible offsets from the floating indices of the mask
        if(indices.length === 0)
            return [0]
        if(indexNum === indices.length - 1) 
            return [0, Math.pow(2, BITS - indices[indexNum] - 1)]
        
        let followingOffsets = floatingOffsets(indices, indexNum + 1) // find all outcomes for the index AFTER this one
        return [...followingOffsets, ...followingOffsets.map(val => val + Math.pow(2, BITS - indices[indexNum] - 1))] // two possibilities: this index is 0 or 1
    }

    // part 1
    for(line of lines) {
        line = line.split(' = ')
        if(line[0] === 'mask') {
            currentMask = line[1].split('')
        }
        else {
            let memoryIndex = memoryRegex.exec(line[0])[1] // gets the index where the data will be stored
            let binaryNum = parseInt(line[1]).toString(2).split('') // binary as a char array
            let finalNum = new Array(36).fill('0')
            for(let i = 0; i < binaryNum.length; i++) { // fills the binary num into the final array to standardize size
                finalNum[BITS - i - 1] = currentMask[BITS - i - 1] === 'X' ? binaryNum[binaryNum.length - i - 1] : currentMask[BITS - i - 1] // applies the bit masking
            }
            for(let i = binaryNum.length; i < BITS; i++) { // finishes applying the bitmask from where the previous loop left off
                finalNum[BITS - i - 1] = currentMask[BITS - i - 1] === 'X' ? finalNum[BITS - i - 1] : currentMask[BITS - i - 1]
            }
            finalNum = parseInt(finalNum.join(''), 2) // converts back into a decimal number
            memory.set(memoryIndex, finalNum)
        }
    }
    let memorySum = [...memory.values()].reduce((acc, cur) => acc + cur)
    console.log(`P1: Sum of all values in memory is ${memorySum}.`)

    // part 2
    memory = new Map()
    currentMask = [] // mask will be converted to a char array
    for(line of lines) {
        line = line.split(' = ')
        let floatingIndices = []
        if(line[0] === 'mask') {
            currentMask = line[1].split('')
        }
        else {
            let memoryIndex = memoryRegex.exec(line[0])[1] // gets the index where the data will be stored
            let binaryNum = parseInt(memoryIndex).toString(2).split('') // binary as a char array, this time using the memory index
            let finalNum = new Array(36).fill('0')
            for(let i = 0; i < binaryNum.length; i++) { // fills the binary num into the final array to standardize size
                finalNum[BITS - i - 1] = binaryNum[binaryNum.length - i - 1]
            }
            for(let i = 0; i < BITS; i++) { // applies the bitmask
                let currentMaskVal = currentMask[i]
                if(currentMaskVal === '1')
                    finalNum[i] = '1'
                else if(currentMaskVal === 'X') {
                    finalNum[i] = '0'
                    floatingIndices.push(i)
                }
            }
            let baseMemoryIndex = parseInt(finalNum.join(''), 2) // starting index to offset from, in decimal
            let allPossibleOffsets = floatingOffsets(floatingIndices, 0).map(val => val + baseMemoryIndex)
            for(index of allPossibleOffsets) {
                memory.set(index, parseInt(line[1]))
            }
        }
    }
    memorySum = [...memory.values()].reduce((acc, cur) => acc + cur)
    console.log(`P2: Sum of all values in memory is ${memorySum}.`)
})