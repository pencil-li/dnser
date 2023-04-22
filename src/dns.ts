export const getDnsServers = (type: "ICANN" | "HNS"): string[] => {
  const dnsServers = {
    ICANN: ["0.0.0.0", "1.1.1.1"],
    HNS: ["103.196.38.38", "103.196.38.39"],
  };

  return dnsServers[type];
};
