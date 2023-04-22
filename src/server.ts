import express from "express";
import { getTldInfo } from "./index";
import { getDnsServers } from "./dns";

const app = express();
const port = process.env.PORT || 3003;

app.get("/api/tld/:tldType", (req, res) => {
  const tldType = req.params.tldType.toUpperCase();
  const tlds = getTldInfo(tldType as "HNS" | "ICANN");

  // Get the name query parameter
  const name = req.query.name?.toString().toLowerCase();

  if (tlds.length > 0) {
    // Filter the TLD data based on the provided name
    const filteredTlds = name
      ? tlds.filter((tld) => tld.toLowerCase().includes(name))
      : tlds;

    res.json({ tlds: filteredTlds });
  } else {
    res.status(400).json({ error: "Invalid TLD type" });
  }
});

app.get("/api/dns/:dnsType", (req, res) => {
  const dnsType = req.params.dnsType.toUpperCase();
  const dnsServers = getDnsServers(dnsType as "HNS" | "ICANN");

  if (dnsServers.length > 0) {
    res.json({ dnsServers });
  } else {
    res.status(400).json({ error: "Invalid DNS type" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:${port}/api/tld/hns`);
  console.log(`http://localhost:${port}/api/tld/icann`);
  console.log(`http://localhost:${port}/api/dns/hns`);
  console.log(`http://localhost:${port}/api/dns/icann`);
  console.log(`http://localhost:3003/api/tld/icann?name=com`);
  console.log(`http://localhost:3003/api/tld/hns?name=coin`);
});
