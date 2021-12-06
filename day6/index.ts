import fs from 'fs';

const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(',')
  .map(Number);

const add = (a: number, b: number) => a + b;
const increment = (value: number) => (obj: Record<number, number>, key: number) => {
  obj[key] = add(obj[key] ?? 0, value);
  return obj;
};

function createSimulation(data: Record<number, number>) {
  return (days: number) => {
    let rem = days;
    let currentDay = data;

    while (rem--) {
      const newDay: Record<number, number> = {};
      for (const key in currentDay) {
        const inc = increment(currentDay[key]);
        const set = (age: number) => inc(newDay, age);
        const age = Number(key) - 1;

        if (age < 0) {
          set(8);
          set(6);
        } else {
          set(age);
        }
      }

      currentDay = newDay;
    }

    return Object
      .values(currentDay)
      .reduce(add);
  };
}

const simulate = createSimulation(input.reduce(increment(1), {}));
const answer1 = simulate(80);
const answer2 = simulate(256);

console.log({ answer1, answer2 });
