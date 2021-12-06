import fs from 'fs';

type Point = [number, number];
type Line = [Point, Point];

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n');
const coords = input.map(line => line.split(' -> ').map(point => point.split(',').map(Number))) as Line[];

const max = Math.max(...coords.flat(2));
const grid = Array.from({ length: max + 1 }).map(() => Array.from({ length: max + 1 }).fill(0)) as Point[];

function *range(from: number, to: number): Generator<number> {
  let start = from;
  if (from <= to) {
    while (start <= to) yield start++;
  } else {
    while (start >= to) yield start--;
  }
}

// eslint-disable-next-line complexity
const solve = (data: Line[]) => {
  for (const [[x1, y1], [x2, y2]] of data) {
    const genX = range(x1, x2);
    const genY = range(y1, y2);

    let xCurr = genX.next();
    let yCurr = genY.next();

    let x = xCurr.value;
    let y = yCurr.value;

    while (!xCurr.done || !yCurr.done) {
      grid[y][x]++;
      xCurr = genX.next();
      yCurr = genY.next();
      x = xCurr.value ?? x;
      y = yCurr.value ?? y;
    }
  }

  return grid.flatMap(point => point.filter(v => v > 1)).length;
};

const straight = ([[x1, y1], [x2, y2]]: Line) => x1 === x2 || y1 === y2;
const diagonal = ([[x1, y1], [x2, y2]]: Line) => x1 !== x2 && y1 !== y2;

const answer1 = solve(coords.filter(straight));
const answer2 = solve(coords.filter(diagonal));

console.log({ answer1, answer2 });
