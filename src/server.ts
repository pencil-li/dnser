import express from "express";
import { getTldInfo } from "./index";
import { getDnsServers } from "./dns";
import { mockDomainAvailability } from "./mockDomainAvailability";
import { fetchHnsDomainData } from "./fetch";

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

app.get("/api/domain/availability", async (req, res) => {
  const domain = req.query.domain?.toString().toLowerCase();

  if (!domain) {
    res.status(400).json({ error: "Domain parameter is required" });
    return;
  }

  const icannTlds = getTldInfo("ICANN");
  const hnsTlds = getTldInfo("HNS");

  const domainTld = domain.split(".").pop()?.toLowerCase();

  const isIcannTld = icannTlds.includes(domainTld || "");

  const icannAvailable = !isIcannTld && mockDomainAvailability(domain);

  let hnsAvailable = false;
  try {
    await fetchHnsDomainData(domain);
  } catch (error) {
    if (error instanceof Error) {
      hnsAvailable = !isIcannTld;
    } else {
      res.status(500).json({ error: "Error fetching HNS domain data" });
      return;
    }
  }

  res.json({
    ICANN: { domain, available: icannAvailable },
    HNS: { domain, available: hnsAvailable },
  });
});

app.get("/api/hns/domain/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();

  try {
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
  console.log(
    `http://localhost:${port}/api/domain/availability?domain=miguelgargallo`
  );
  console.log(`http://localhost:${port}/api/hns/domain/miguelgargallo`);
});
