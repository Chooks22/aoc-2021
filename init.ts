import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import pc from 'picocolors';
import { fetch } from 'undici';

async function fetchInput(day: string) {
  const headers = { cookie: `session=${process.env.SESSION}` };
  const url = `https://adventofcode.com/2021/day/${day}/input`;
  const res = await fetch(url, { headers });
  return res.text();
}

async function createProject(day: string, input: string) {
  const code = 'import fs from \'fs\';\n\nconst input = fs.readFileSync(`${__dirname}/input.txt`, \'utf-8\');\n';
  const folder = path.resolve(`./day${day}`);

  await fs.mkdir(folder, { recursive: true });
  const write1 = fs.writeFile(`${folder}/input.txt`, input);
  const write2 = fs.writeFile(`${folder}/index.ts`, code);
  await Promise.all([write1, write2]);
}

async function main(day: string) {
  const start = Date.now();

  console.info(`Fetching input for ${pc.green(`day ${day}`)}...`);
  const input = await fetchInput(day);

  console.info('Creating project files...');
  await createProject(day, input);

  const end = Date.now() - start;
  console.info(pc.green('SUCCESS'), `Day ${day} initialized. Time took: ${end}ms`);
}

const day = process.argv[2];

if (isNaN(day as never)) {
  console.error(pc.red('ERROR'), 'No valid day was provided!');
  process.exit(1);
}

main(day);
