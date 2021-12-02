import fs from 'fs';

type Movement = 'forward' | 'down' | 'up';
type Square = [number, number];
type Cube = [...Square, number];

const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split('\n')
  .map(v => {
    const [mov, val] = v.split(' ');
    return [mov, Number(val)] as [Movement, number];
  });

const answer1 = Math.imul(...input.reduce<Square>(
  ([pos, depth], [mov, val]): Square => mov === 'forward'
    ? [pos + val, depth]
    : [pos, depth + val * (mov === 'up' ? -1 : 1)],
  [0, 0],
));

const answer2 = Math.imul(...input.reduce<Cube>(
  ([pos, depth, aim], [mov, val]): Cube => mov === 'forward'
    ? [pos + val, depth + aim * val, aim]
    : [pos, depth, aim + val * (mov === 'up' ? -1 : 1)],
  [0, 0, 0],
).slice(0, 2) as Square);

console.log({ answer1, answer2 });
