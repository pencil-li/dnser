import express from "express";
import { getTldInfo } from "./index";
import { getDnsServers } from "./dns"; // Step 1: Import the function

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

// Step 2: Create a new API endpoint
app.get("/api/dns/:dnsType", (req, res) => {
  const dnsType = req.params.dnsType.toUpperCase();

  // Step 3: Use the getDnsServers function
  const dnsServers = getDnsServers(dnsType as "HNS" | "ICANN");

  if (dnsServers.length > 0) {
    // Step 4: Return the DNS servers as a JSON response
    res.json({ dnsServers });
  } else {
    res.status(400).json({ error: "Invalid DNS type" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:${port}/api/tld/hns`);
  console.log(`http://localhost:${port}/api/tld/icann`);
  console.log(`http://localhost:${port}/api/dns/hns`); // Added example DNS API endpoint
  console.log(`http://localhost:${port}/api/dns/icann`); // Added example DNS API endpoint
});
