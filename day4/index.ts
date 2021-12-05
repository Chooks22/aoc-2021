/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const [_rolls, ..._cards] = input.split('\n\n');

type Deck = (string | true)[][][];
const rolls = _rolls.split(',');
let cards: Deck = _cards.map(card => card.split('\n').map(v => v.trim().split(/ +/g)));

const checkH = (arr: Deck) => arr.filter(card => card.some(row => row.every(v => v === true)));
const checkV = (arr: Deck) => arr.filter(card => {
  for (let x = 0, len = card[0].length; x < len; x++) {
    const col = card.map(line => line[x]);
    if (col.every(v => v === true)) return true;
  }
  return false;
});

const check = (arr: Deck) => {
  const h = checkH(arr);
  return h.length ? h : checkV(arr);
};

let first: (string | true)[][];
let last: (string | true)[][];
let firstRoll: string;
let lastRoll: string;

for (lastRoll of rolls) {
  cards = cards.map(card => card.map(row => row.map(v => v === lastRoll ? true : v)));
  const solved = check(cards);

  if (solved.length) {
    first ??= solved[0];
    firstRoll ??= lastRoll;
    cards = cards.filter(card => !solved.includes(card));
  }

  if (!cards.length) {
    last = solved[0];
    break;
  }
}

const answer1 = Number(firstRoll!) * first!
  .flat()
  .reduce((sum, val) => val === true ? sum : sum + Number(val), 0);

const answer2 = Number(lastRoll!) * last!
  .flat()
  .reduce((sum, val) => val === true ? sum : sum + Number(val), 0);

console.log({ answer1, answer2 });
