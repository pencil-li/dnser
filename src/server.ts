import express from "express";
import { getTldInfo } from "./index";
import { getDnsServers } from "./dns";
import { mockDomainAvailability } from "./mockDomainAvailability";
import { fetchHnsDomainData } from "./fetch"; // Import the fetchHnsDomainData function

const app = express();
const port = process.env.PORT || 3003;

app.get("/api/tld/:tldType", (req, res) => {
  const tldType = req.params.tldType.toUpperCase();
  const tlds = getTldInfo(tldType as "HNS" | "ICANN");
  const name = req.query.name?.toString().toLowerCase();

  if (tlds.length > 0) {
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

// Updated endpoint for checking domain availability
app.get("/api/domain/availability", (req, res) => {
  const domain = req.query.domain?.toString().toLowerCase();

  if (!domain) {
    res.status(400).json({ error: "Domain parameter is required" });
    return;
  }

  // Get the TLDs for both ecosystems
  const icannTlds = getTldInfo("ICANN");
  const hnsTlds = getTldInfo("HNS");

  // Extract the TLD from the domain
  const domainTld = domain.split(".").pop()?.toLowerCase();

  // Check if the domain is an ICANN TLD
  const isIcannTld = icannTlds.includes(domainTld || "");

  // Check domain availability in both ecosystems
  const icannAvailable = !isIcannTld && mockDomainAvailability(domain);
  const hnsAvailable = mockDomainAvailability(domain);

  res.json({
    ICANN: { domain, available: icannAvailable },
    HNS: { domain, available: hnsAvailable },
  });
});

// Updated HNS domain data endpoint
app.get("/api/hns/domain/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();

  try {
    // Use the fetchHnsDomainData function
    const hnsDomainData = await fetchHnsDomainData(name);

    res.json(hnsDomainData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error fetching HNS domain data" });
    }
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:${port}/api/tld/hns`);
  console.log(`http://localhost:${port}/api/tld/icann`);
  console.log(`http://localhost:${port}/api/dns/hns`);
  console.log(`http://localhost:${port}/api/dns/icann`);
  console.log(`http://localhost:${port}/api/domain/availability?domain=miguelgargallo`);
  console.log(`http://localhost:${port}/api/hns/domain/miguelgargallo`);
});
