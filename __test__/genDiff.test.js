import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildFullPath = (filepath) => (path.isAbsolute(filepath) ? filepath : path.join(__dirname, '..', '__fixtures__', filepath));

const readFile = (filename) => readFileSync(buildFullPath(filename), 'utf-8');

const expectedStylish = readFile('expected-stylish.txt');
const expectedPlain = readFile('expected-plain.txt');
const expectedJSON = readFile('expected-json.txt');

const formats = ['json', 'yml', 'yaml'];

test.each([formats])('Compare two files', (formatName) => {
  const firstFile = buildFullPath(`file1.${formatName}`);
  const secondFile = buildFullPath(`file2.${formatName}`);
  expect(genDiff(firstFile, secondFile)).toEqual(expectedStylish);
  expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expectedPlain);
  expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedJSON);
});

test.each([formats])('Wrong file extension or format name', (formatName) => {
  const wrongExtension = buildFullPath('file1.txt');
  const firstFile = buildFullPath(`file1.${formatName}`);
  const secondFile = buildFullPath(`file2.${formatName}`);

  expect(() => genDiff(wrongExtension, secondFile, 'json'))
    .toThrow("Unknown extension: 'txt'. Supported formats are: json, yml, yaml");
  expect(() => genDiff(firstFile, secondFile, 'smlish'))
    .toThrow('Unknown format!');
});
