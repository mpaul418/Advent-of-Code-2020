import os

os.chdir('Day-1')

input = open("./input.txt", "r")
lines = list(map(lambda x : int(x), input.readlines()))

def part1():
    for i in range(len(lines) - 1):
        for j in range(i,len(lines)):
            if lines[i] + lines[j] == 2020:
                print('Part 1 multiplies to {}'.format(lines[i]*lines[j]))

def part2():
    for i in range(len(lines) - 2):
        for j in range(i,len(lines) - 1):
            for k in range(j, len(lines)):
                if lines[i] + lines[j] + lines[k] == 2020:
                    print('Part 2 multiplies to {}'.format(lines[i]*lines[j]*lines[k]))

part1()
part2()