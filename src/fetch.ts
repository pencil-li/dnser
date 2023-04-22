import axios from "axios";

export const fetchHnsDomainData = async (name: string) => {
  try {
    const domainDataResponse = await axios.get(
      `https://e.hnsfans.com/api/names/${name}`
    );
    const domainHistoryResponse = await axios.get(
      `https://e.hnsfans.com/api/names/${name}/history`
    );
    const fetchDomainData = await axios.get(
      `https://api.niami.io/domain/${name}`
    );
    const fetchUnicodeData = await axios.get(
      `https://api.niami.io/domain/unicode/${name}`
    );
    const fetchHsdData = await axios.get(`https://api.niami.io/hsd/${name}`);
    const fetchTxsData = await axios.get(`https://api.niami.io/txs/${name}`);
    const hnsDomainData = {
      ...domainDataResponse.data,
      history: domainHistoryResponse.data.result,
      domain: fetchDomainData.data,
      unicode: fetchUnicodeData.data,
      hsd: fetchHsdData.data,
      txs: fetchTxsData.data,
    };
    return hnsDomainData;
  } catch (error) {
    throw new Error("Error fetching HNS domain data");
  }
};
