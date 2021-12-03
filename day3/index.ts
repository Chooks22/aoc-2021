import fs from 'fs';

const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split('\n')
  .map(v => v.split('').map(Number));

type Predicate = (v: number) => boolean;
const decoder = (prev: number[], curr: number[]) => prev.map((v, i) => v + (curr[i] ? 1 : -1));
const decode = (arr: number[]) => (predicate: Predicate) => parseInt(arr.map(v => Number(predicate(v))).join(''), 2);

const solve1 = decode(input.reduce(decoder));
console.log(solve1(n => n > 0) * solve1(n => n < 0));

const fill = Array.from({ length: input[0].length }).fill(0) as number[];
const rate = (array: number[][], predicate: Predicate, i = 0): number[][] => {
  if (array.length < 2) return array;
  const common = Number(predicate(array.reduce(decoder, fill)[i]));
  return rate(array.filter(v => v[i] === common), predicate, i + 1);
};

const solve2 = (predicate: Predicate) => parseInt(rate(input, predicate)[0].join(''), 2);
console.log(solve2(v => v >= 0) * solve2(v => v < 0));
