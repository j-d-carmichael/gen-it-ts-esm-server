import path from 'path';
import fs from 'fs-extra';
import { inspect } from 'util';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageObj = fs.readJsonSync(packageJsonPath);

function formatMessageToPrint (item: any) {
  return (typeof item !== 'string' ? inspect(item, { depth: null, colors: true }) : item);
}

function logger (logItems: any[], level: string) {
  if (logItems.length === 0) {
    return;
  }
  const msg = formatMessageToPrint(logItems.shift());
  const rest = logItems.map((data) => formatMessageToPrint(data)).join(' ');
  const logEntry = `[${packageObj.name}] ${new Date().toISOString()} ${level}: ${msg} - ${rest}` + '\n';
  if (level === 'ERROR') {
    process.stderr.write(logEntry);
  } else {
    process.stdout.write(logEntry);
  }
}

// Override the base console log with winston
console.log = function (...args) {
  logger([...args], 'LOG');
};
console.error = function (...args) {
  logger([...args], 'ERROR');
};
console.info = function (...args) {
  logger([...args], 'INFO');
};

