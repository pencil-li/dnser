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

const sentences = [
  "Installing Dependencies!",
  "Loading Server!",
  "Deploying server!",
];

let characterFrame = 0;

const printCharacter = (sentence: string) => {
  const frames = [
    [' O', ' /|\\', ' / \\'],
    [' O', ' /|\\', '/ \\'],
    [' O', '/|\\', ' / \\'],
  ];

  const currentFrame = frames[characterFrame % frames.length];

  currentFrame.forEach((line) => console.log(colorize(line, 34)));

  console.log(colorize(createRoundedBox(sentence, sentence.length + 4, 3), 36));
};

const printLoadingBar = (offset: number) => {
  const colors = [31, 33, 32, 36, 34, 35];
  const barLength = 20;
  const bar = Array(barLength)
    .fill("█")
    .map((char, index) => colorize(char, colors[(index + offset) % colors.length]))
    .join("");
  console.log(bar);
};


app.listen(port, () => {
  clearConsole();
  console.log(colorize(createRoundedBox("Welcome to the server!", 30, 5), 36));
  console.log("Loading...");

  let loadingAnimation: NodeJS.Timeout;
  let color = 31;
  let sentenceIndex = 0;

  const startLoadingAnimation = () => {
    loadingAnimation = setInterval(() => {
      clearConsole();
      printCharacter(sentences[sentenceIndex % sentences.length]);
      printLoadingBar(color);

      color = color === 37 ? 31 : color + 1;
      characterFrame++;
      if (characterFrame % 5 === 0) {
        sentenceIndex++;
      }
    }, 500);
  };

  const stopLoadingAnimation = () => {
    clearInterval(loadingAnimation);
  };

  startLoadingAnimation();

  setTimeout(() => {
    stopLoadingAnimation();
    clearConsole();
    printCharacter(sentences[sentences.length - 1]);
    console.log(colorize(createRoundedBox("Server Deployed!", 30, 5), 33));

    setTimeout(() => {
      clearConsole();
      console.log(colorize(`\nServer is listening on port ${port}`, 32));
      console.log(colorize(`http://localhost:${port}/api/tld/hns`, 34));
      console.log(colorize(`http://localhost:${port}/api/tld/icann`, 34));
    }, 3000);
  }, 3000);
});
