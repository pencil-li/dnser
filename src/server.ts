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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:${port}/api/tld/hns`);
  console.log(`http://localhost:${port}/api/tld/icann`);
});
