#!/usr/bin/env python

from functools import reduce

def count_trees(row_inc, col_inc):
    trees = 0
    col = 0
    with open("input.txt", "r") as input:
        lines = input.readlines()

        for i in range(0, len(lines), row_inc):
            line = lines[i].rstrip()
            if line[col % len(line)] == "#":
                trees += 1
            col += col_inc

    return trees

print(count_trees(1, 3))

values = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]

product = reduce(lambda prod, inc: prod * count_trees(inc[0], inc[1]), values, 1)

print(product)
