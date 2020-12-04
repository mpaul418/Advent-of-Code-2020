const fs = require('fs');

fs.readFile('./Day-4/input.txt', 'utf8', (err, data) => {
    const lines = data.split('\n\n')

    let part1ValidPassports = 0
    let part2ValidPassports = 0

    lines.forEach(line => {
        let fields = line.replace(/\s/g, ' ')
        let part1Regex = /(((byr)|(iyr)|(eyr)|(hgt)|(hcl)|(ecl)|(pid)):.+(\s|$)){7}/
        let part2Regex = /(((byr:((19[2-9]\d)|(200[0-2])))|(iyr:((201\d)|(2020)))|(eyr:((202\d)|(2030)))|(hgt:((1(([5-8]\d)|(9[0-3]))cm)|(((59)|(6\d)|(7[0-6]))in)))|(hcl:#\w{6})|(ecl:((amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)))|(pid:\d{9}))(\s|$)(cid:\S+(\s|$))?){7}/

        if(fields.match(part1Regex)) { // regex hell part 2
            part1ValidPassports++
        }

        if(fields.match(part2Regex)) { // WE NEED TO GO BACK
            part2ValidPassports++
        }
    })

    console.log(`Part 1 has ${part1ValidPassports} valid passports.`)
    console.log(`Part 2 has ${part2ValidPassports} valid passports.`)
})