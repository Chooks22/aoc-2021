import fs from 'fs';

const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split('\n')
  .map(Number);

const answer1 = input
  .filter((value, i, array) => value > array[i - 1])
  .length;

const sumGroup = (array: number[], i: number) => array
  .slice(i, i + 3)
  .reduce((a, b) => a + b, 0);

const answer2 = input
  .reduce((total, value, i, array) => {
    const prev = sumGroup(array, Math.max(i - 1, 0));
    const curr = sumGroup(array, i);
    return total + Number(curr > prev);
  }, 0);

console.log({ answer1, answer2 });
