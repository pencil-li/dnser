import express from "express";
import { getTldInfo } from "./index";

const app = express();
const port = process.env.PORT || 3003;

app.get("/api/tld/:tldType", (req, res) => {
  const tldType = req.params.tldType.toUpperCase();
  const tlds = getTldInfo(tldType as "HNS" | "ICANN");

  if (tlds.length > 0) {
    res.json({ tlds });
  } else {
    res.status(400).json({ error: "Invalid TLD type" });
  }
});

const colorize = (text: string, code: number): string => `\u001b[${code}m${text}\u001b[0m`;

const createRoundedBox = (text: string, width: number, height: number): string => {
  const horizontal = '─'.repeat(width - 2);
  const vertical = '│';

  const top = `╭${horizontal}╮`;
  const middle = `${vertical}${' '.repeat(width - 2)}${vertical}`;
  const bottom = `╰${horizontal}╯`;

  let box = top + '\n';
  for (let i = 0; i < height - 2; i++) {
    if (i === Math.floor((height - 2) / 2)) {
      const textStart = Math.floor((width - text.length) / 2);
      box += `${vertical}${' '.repeat(textStart)}${text}${' '.repeat(width - text.length - textStart - 2)}${vertical}\n`;
    } else {
      box += middle + '\n';
    }
  }
  box += bottom;

  return box;
};

const clearConsole = () => process.stdout.write('\x1Bc');

app.listen(port, () => {
  clearConsole();
  console.log(colorize(createRoundedBox("Welcome to the server!", 30, 5), 36));
  console.log("Loading...");

  setTimeout(() => {
    clearConsole();
    console.log(colorize(createRoundedBox("Fun staff loaded and ready!", 30, 5), 33));

    setTimeout(() => {
      clearConsole();
      console.log(colorize(`\nServer is listening on port ${port}`, 32));
      console.log(colorize(`http://localhost:${port}/api/tld/hns`, 34));
      console.log(colorize(`http://localhost:${port}/api/tld/icann`, 34));
    }, 10000);
  }, 10000);
});
